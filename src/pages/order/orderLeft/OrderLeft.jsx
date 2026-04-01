import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react'
import InputText from '../../../components/form/inputField/InputText'
import PageText from '../../../content/PagesText.json'
import { useSelector } from 'react-redux'
import styles from './orderLeft.module.css'
import UserAddress from '../../../components/userAddress/UserAddress'
import AddAddress from '../../../components/userAddress/add/AddAddress'
import AuthButton from '../../../components/form/button/AuthButton'
import OrdersService from '../../../services/orders.service'
import DeliveryService from '../../../services/delivery.service'
import Loading from '../../../components/loading/Loading'
import Error from '../../../components/error/Error'
import Success from '../../../components/success/Success'
import { Down } from '../../../icons'
import { handleApiReqRes } from '../../../utils/handleApiReqRes.util';
import { addressReducer } from '../../../utils/addressReducer';

const { order, profile } = PageText
const localeByLang = {
    az: 'az-AZ',
    ru: 'ru-RU',
    en: 'en-US'
};
const deliveryTimeZone = 'Asia/Baku';

const relativeDayLabels = {
    az: { today: 'Bu gün', tomorrow: 'Sabah' },
    ru: { today: 'Сегодня', tomorrow: 'Завтра' },
    en: { today: 'Today', tomorrow: 'Tomorrow' }
};

const getDateFromIso = (dateString) => {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
};

const isSameDate = (left, right) => {
    return left.getFullYear() === right.getFullYear()
        && left.getMonth() === right.getMonth()
        && left.getDate() === right.getDate();
};

const formatTimeOptionLabel = (timeOption, lang) => {
    if (!timeOption) return '';

    const date = new Date(timeOption);
    if (Number.isNaN(date.getTime())) return '';

    return date.toLocaleTimeString(localeByLang[lang] || 'en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: deliveryTimeZone
    });
};

const formatDateOptionLabel = (dateString, lang) => {
    if (!dateString) return '';

    const date = getDateFromIso(dateString);
    if (Number.isNaN(date.getTime())) return '';

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (isSameDate(date, today)) {
        return relativeDayLabels[lang]?.today || 'Today';
    }

    if (isSameDate(date, tomorrow)) {
        return relativeDayLabels[lang]?.tomorrow || 'Tomorrow';
    }

    return date.toLocaleDateString(localeByLang[lang] || 'en-US', {
        weekday: 'short',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};

export default function OrderLeft({ content, delivery, setDelivery }) {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        comment: "",
        date: "",
        time: ""
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [message, setMessage] = useState("Something went wrong")
    const [success, setSuccess] = useState(false)
    const [byCard, setByCard] = useState(true)
    const [addresses, dispatch] = useReducer(addressReducer, []);
    const [add, setAdd] = useState(false)
    const [submitAttempted, setSubmitAttempted] = useState(false)
    const [fieldErrors, setFieldErrors] = useState({ name: '', phone: '', date: '', time: '', address: '' })
    const [openPicker, setOpenPicker] = useState({ date: false, time: false })
    const [deliveryDateTimeOptions, setDeliveryDateTimeOptions] = useState([])
    const datePickerRef = useRef(null)
    const timePickerRef = useRef(null)

    const { lang, finalCart, user, token } = useSelector((state) => state.baristica);

    const ordersService = useMemo(() => new OrdersService(), [])
    const deliveryService = useMemo(() => new DeliveryService(), [])

    const getTimeOptionsForDate = useCallback((dateString) => {
        if (!dateString) return [];

        const selectedOption = deliveryDateTimeOptions.find((option) => option?.date === dateString);
        return Array.isArray(selectedOption?.timeOptions) ? selectedOption.timeOptions : [];
    }, [deliveryDateTimeOptions]);

    const dateOptions = useMemo(() => {
        return deliveryDateTimeOptions
            .filter((option) => option?.date && Array.isArray(option?.timeOptions) && option.timeOptions.length)
            .map((option) => ({
                value: option.date,
                label: formatDateOptionLabel(option.date, lang)
            }));
    }, [deliveryDateTimeOptions, lang]);
    const timeOptions = useMemo(() => getTimeOptionsForDate(formData.date), [formData.date, getTimeOptionsForDate]);
    const selectedDateLabel = dateOptions.find((option) => option.value === formData.date)?.label || '';
    const selectedTimeLabel = useMemo(() => formatTimeOptionLabel(formData.time, lang), [formData.time, lang]);

    const getSelectedAddressId = useCallback(() => {
        let selectedAddressId = null;
        for (let addr of addresses) {
            if (addr.selected) {
                selectedAddressId = addr._id;
                break;
            } else if (addr.isPrimary) {
                selectedAddressId = addr._id;
            }
        }
        return selectedAddressId;
    }, [addresses]);

    const validateDeliveryFields = useCallback((dateValue, timeValue) => {
        const errors = { date: '', time: '' };

        if (!dateValue) {
            errors.date = content?.deliveryDateRequiredError || 'Please select a delivery date';
            return errors;
        }

        const dateIsAvailable = dateOptions.some((option) => option.value === dateValue);
        if (!dateIsAvailable) {
            errors.date = content?.deliveryDateInvalidError || 'Selected date is not available for delivery';
        }

        if (!timeValue) {
            errors.time = content?.deliveryTimeRequiredError || 'Please select a delivery time';
            return errors;
        }

        const timesForDate = getTimeOptionsForDate(dateValue);
        const timeIsAvailable = timesForDate.includes(timeValue);
        if (!timeIsAvailable) {
            errors.time = content?.deliveryTimeInvalidError || 'Selected time is outside delivery hours';
        }

        return errors;
    }, [content, dateOptions, getTimeOptionsForDate]);

    const validateOrderFields = useCallback((nextFormData, isDelivery, selectedAddressId) => {
        const errors = { name: '', phone: '', date: '', time: '', address: '' };

        if (!nextFormData.name?.trim()) {
            errors.name = content?.nameRequiredError || 'Please enter your name';
        }

        const digitsOnly = (nextFormData.phone || '').replace(/\D/g, '');
        const phoneIsValid = /^\+?[0-9\s\-()]{7,20}$/.test(nextFormData.phone || '') && digitsOnly.length >= 7;
        if (!nextFormData.phone?.trim()) {
            errors.phone = content?.phoneRequiredError || 'Please enter your phone number';
        } else if (!phoneIsValid) {
            errors.phone = content?.phoneInvalidError || 'Please enter a valid phone number';
        }

        if (isDelivery) {
            const deliveryErrors = validateDeliveryFields(nextFormData.date, nextFormData.time);
            errors.date = deliveryErrors.date;
            errors.time = deliveryErrors.time;

            if (!selectedAddressId) {
                errors.address = content?.addressRequiredError || 'Please select or add a delivery address';
            }
        }

        return errors;
    }, [content, validateDeliveryFields]);

    const onSubmit = async () => {
        setSubmitAttempted(true);

        const selectedAddressId = getSelectedAddressId();
        const validationErrors = validateOrderFields(formData, delivery, selectedAddressId);
        setFieldErrors(validationErrors);

        const hasErrors = Object.values(validationErrors).some(Boolean);
        if (hasErrors) return;

        setOpenPicker({ date: false, time: false });

        const data = {
            language: lang,
            order: {
                customer: {
                    name: formData.name,
                    phone: formData.phone
                },
                deliveryMethod: delivery ? 'delivery' : 'pickup',
                address: selectedAddressId,
                deliveryAddress: selectedAddressId,
                items: finalCart.map((product) => {
                    const { _id, cartCount, grindingOption } = product
                    return { product: _id, quantity: cartCount, grindingOption: grindingOption }
                }),
                paymentMethod: byCard ? 'card' : "cash",
                notes: formData.comment,
                ...(delivery ? {
                    deliveryHour: formatTimeOptionLabel(formData.time, 'en'),
                    deliveryDate: formData.date
                } : {})
            }
        }

        setLoading(true)
        try {
            const request = ordersService.createOrder(token, data)
            const response = await handleApiReqRes(request);
            const url = response.data.redirect.redirect_url
            if (url) {
                window.location.href = url
            }
            setSuccess(true)

        } catch (error) {
            setError(true)
            setMessage(error.message);
        } finally {
            setLoading(false)
        }
    }

    const handleInputChange = (name, value) => {
        setFormData((prev) => {
            const nextFormData = { ...prev, [name]: value };

            if (submitAttempted) {
                const selectedAddressId = getSelectedAddressId();
                setFieldErrors(validateOrderFields(nextFormData, delivery, selectedAddressId));
            }

            return nextFormData;
        });
    }

    useEffect(() => {
        let isActive = true;

        const loadDeliveryDateTimeOptions = async () => {
            try {
                const request = deliveryService.getTimeOptions();
                const response = await handleApiReqRes(request);
                const options = response?.data?.deliveryDateTimeOptions;

                if (isActive) {
                    setDeliveryDateTimeOptions(Array.isArray(options) ? options : []);
                }
            } catch (error) {
                if (isActive) {
                    setDeliveryDateTimeOptions([]);
                }
            }
        };

        loadDeliveryDateTimeOptions();

        return () => {
            isActive = false;
        };
    }, [deliveryService])

    useEffect(() => {
        const defaultDate = dateOptions[0]?.value || '';
        const defaultTime = defaultDate ? (getTimeOptionsForDate(defaultDate)[0] || '') : '';
        const hasUser = user && Object.keys(user).length > 0;

        dispatch({ type: 'INIT', payload: hasUser ? (user.addresses || []) : [] });

        setFormData((prev) => ({
            ...prev,
            name: hasUser ? (user.name || prev.name || "") : prev.name,
            phone: hasUser ? (user.phone || prev.phone || "") : prev.phone,
            date: prev.date || defaultDate,
            time: prev.time || defaultTime
        }));
    }, [dateOptions, getTimeOptionsForDate, user])

    useEffect(() => {
        if (!delivery) {
            setFieldErrors((prev) => {
                if (!prev.date && !prev.time && !prev.address) return prev;
                return { ...prev, date: '', time: '', address: '' };
            });
            if (submitAttempted) {
                setSubmitAttempted(false);
            }
            return;
        }

        if (!dateOptions.length) {
            if (formData.date || formData.time) {
                setFormData((prev) => ({ ...prev, date: '', time: '' }));
            }
            return;
        }

        const dateIsAvailable = dateOptions.some((option) => option.value === formData.date);
        if (!dateIsAvailable) {
            const nextDate = dateOptions[0]?.value || '';
            const nextTime = nextDate ? (getTimeOptionsForDate(nextDate)[0] || '') : '';
            setFormData((prev) => ({ ...prev, date: nextDate, time: nextTime }));
            return;
        }

        if (!formData.date || !timeOptions.length) {
            if (formData.time) setFormData((prev) => ({ ...prev, time: '' }));
            return;
        }
        if (timeOptions.includes(formData.time)) return;

        setFormData((prev) => ({ ...prev, time: timeOptions[0] }));
    }, [dateOptions, delivery, formData.date, formData.time, getTimeOptionsForDate, submitAttempted, timeOptions])

    useEffect(() => {
        if (!submitAttempted) return;
        const selectedAddressId = getSelectedAddressId();
        setFieldErrors(validateOrderFields(formData, delivery, selectedAddressId));
    }, [delivery, formData, getSelectedAddressId, submitAttempted, validateOrderFields])

    useEffect(() => {
        const handleClickOutside = (event) => {
            const clickedInsideDatePicker = datePickerRef.current?.contains(event.target);
            const clickedInsideTimePicker = timePickerRef.current?.contains(event.target);

            if (!clickedInsideDatePicker && !clickedInsideTimePicker) {
                setOpenPicker({ date: false, time: false });
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={styles.orderLeft}>
            <Loading status={loading} />
            <Error status={error} setStatus={setError} message={message} />
            <Success status={success} setStatus={setSuccess} />
            <div className="orderInfo_component">
                <h2 className='f32 fw700'>{content ? content.personalInfoHeading : ''}</h2>
                <InputText
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={lang ? order[lang].nameInput : ''}
                />
                {submitAttempted && fieldErrors.name ? <p className={styles.fieldError}>{fieldErrors.name}</p> : <></>}

                <InputText
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={lang ? order[lang].phoneInput : ''}
                />
                {submitAttempted && fieldErrors.phone ? <p className={styles.fieldError}>{fieldErrors.phone}</p> : <></>}
            </div>

            {
                delivery
                    ?
                    <div className="orderInfo_component">
                        <h2 className='f32 fw700'>{content ? content.timeHeading : ''}</h2>
                        <div className={`${styles.deliveryScheduleRow} flex g20 mt20`}>
                            <div className={styles.selectWrapper} ref={datePickerRef}>
                                <button
                                    type='button'
                                    className={`${styles.selectField} ${submitAttempted && fieldErrors.date ? styles.selectFieldError : ''}`}
                                    onClick={() => {
                                        setOpenPicker((prev) => ({ date: !prev.date, time: false }));
                                    }}
                                >
                                    <span className={formData.date ? styles.selectValue : styles.selectPlaceholder}>
                                        {selectedDateLabel || content?.dateSelectPlaceholder || 'Select delivery date'}
                                    </span>
                                    <span className={`${styles.selectArrow} ${openPicker.date ? styles.selectArrowOpen : ''}`}>{Down}</span>
                                </button>

                                {openPicker.date ? (
                                    <ul className={styles.dropdownList}>
                                        {dateOptions.map((option) => (
                                            <li key={option.value}>
                                                <button
                                                    type='button'
                                                    className={`${styles.dropdownItem} ${option.value === formData.date ? styles.dropdownItemActive : ''}`}
                                                    onClick={() => {
                                                        const selectedDate = option.value;
                                                        const nextTimeOptions = getTimeOptionsForDate(selectedDate);
                                                        const nextTime = nextTimeOptions.includes(formData.time) ? formData.time : (nextTimeOptions[0] || '');

                                                        const nextFormData = {
                                                            ...formData,
                                                            date: selectedDate,
                                                            time: nextTime
                                                        };

                                                        setFormData(nextFormData);
                                                        setOpenPicker({ date: false, time: false });

                                                        if (submitAttempted) {
                                                            const selectedAddressId = getSelectedAddressId();
                                                            setFieldErrors(validateOrderFields(nextFormData, delivery, selectedAddressId));
                                                        }
                                                    }}
                                                >
                                                    {option.label}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                ) : <></>}
                                {submitAttempted && fieldErrors.date ? <p className={styles.fieldError}>{fieldErrors.date}</p> : <></>}
                            </div>

                            <div className={styles.selectWrapper} ref={timePickerRef}>
                                <button
                                    type='button'
                                    className={`${styles.selectField} ${submitAttempted && fieldErrors.time ? styles.selectFieldError : ''} ${!formData.date || !timeOptions.length ? styles.selectFieldDisabled : ''}`}
                                    onClick={() => {
                                        if (!formData.date || !timeOptions.length) return;
                                        setOpenPicker((prev) => ({ date: false, time: !prev.time }));
                                    }}
                                >
                                    <span className={formData.time ? styles.selectValue : styles.selectPlaceholder}>
                                        {selectedTimeLabel || content?.timeSelectPlaceholder || 'Select delivery time'}
                                    </span>
                                    <span className={`${styles.selectArrow} ${openPicker.time ? styles.selectArrowOpen : ''}`}>{Down}</span>
                                </button>

                                {openPicker.time && formData.date && timeOptions.length ? (
                                    <ul className={styles.dropdownList}>
                                        {timeOptions.map((timeOption) => (
                                            <li key={timeOption}>
                                                <button
                                                    type='button'
                                                    className={`${styles.dropdownItem} ${timeOption === formData.time ? styles.dropdownItemActive : ''}`}
                                                    onClick={() => {
                                                        const selectedTime = timeOption;
                                                        const nextFormData = { ...formData, time: selectedTime };

                                                        setFormData(nextFormData);
                                                        setOpenPicker({ date: false, time: false });

                                                        if (submitAttempted) {
                                                            const selectedAddressId = getSelectedAddressId();
                                                            setFieldErrors(validateOrderFields(nextFormData, delivery, selectedAddressId));
                                                        }
                                                    }}
                                                >
                                                    {formatTimeOptionLabel(timeOption, lang)}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                ) : <></>}
                                {submitAttempted && fieldErrors.time ? <p className={styles.fieldError}>{fieldErrors.time}</p> : <></>}
                            </div>
                        </div>
                    </div>
                    :
                    <></>
            }

            <div className="orderInfo_component">
                <h2 className='f32 fw700'>{content ? content.placeHeading : ''}</h2>
                <div className='mt20'>
                    <label className={delivery ? styles.label : styles.labelActive}>
                        <input name='delivery' type="radio" checked={!delivery} onClick={() => setDelivery(false)} />
                        {content ? content.pickupInput : ''}
                    </label>

                </div>
                <div>
                    <label className={delivery ? styles.labelActive : styles.label}>
                        <input name='delivery' type="radio" onClick={() => setDelivery(true)} />
                        {content ? content.deliveryInput : ''}

                    </label>
                </div>

                {
                    delivery
                        ?
                        <>

                            {
                                addresses.length
                                    ?
                                    addresses.map((address, index) => (
                                        <UserAddress
                                            content={lang ? profile[lang].addresses : {}}
                                            address={address}
                                            radio={true}
                                            index={index + 1}
                                            dispatch={dispatch} />
                                    ))
                                    :
                                    <></>
                            }
                            {submitAttempted && fieldErrors.address ? <p className={styles.fieldError}>{fieldErrors.address}</p> : <></>}

                            <button
                                type='button'
                                className={styles.addBtn}
                                onClick={() => setAdd(!add)}
                            >
                                {lang ? profile[lang].addresses.addBtn : ''}
                            </button>

                            {
                                add
                                    ?
                                    <AddAddress dispatch={dispatch} setAdd={setAdd} />
                                    :
                                    <></>
                            }
                        </>
                        :
                        <></>
                }
            </div>

            <div className="orderInfo_component">
                <h2 className='f32 fw700'>{content ? content.commentHeading : ''}</h2>
                <InputText
                    name="comment"
                    value={formData.comment}
                    onChange={handleInputChange}
                    placeholder={lang ? order[lang].commentInput : ''}
                />
            </div>

            <div className="orderInfo_component">
                <h2 className='f32 fw700'>{content ? content.paymentHeading : ''}</h2>

                <div className="flex g20 mt20">
                    {
                        !delivery
                            ?
                            <div className="flex a-center g8 pointer" onClick={() => setByCard(false)}>
                                <span className={styles.circle} >
                                    {
                                        !byCard
                                            ?
                                            <span className={styles.blueCircle}></span>
                                            :
                                            <></>
                                    }
                                </span>
                                <span className='f20 fw400'>
                                    {content ? content.byCash : ''}
                                </span>
                            </div>
                            :
                            <></>
                    }


                    <div className="flex a-center g8 pointer" onClick={() => setByCard(true)}>
                        <span className={styles.circle} >
                            {
                                byCard
                                    ?
                                    <span className={styles.blueCircle}></span>
                                    :
                                    <></>
                            }
                        </span>
                        <span className='f20 fw400'>
                            {content ? content.byCard : ''}
                        </span>
                    </div>

                </div>

            </div>
            <AuthButton text={content ? content.submitBtn : ''} onClick={onSubmit} />
            <p className="mt20 f20 fw400 darkGrey_color">{content ? content.hint : ''}</p>
        </div >
    )
}
