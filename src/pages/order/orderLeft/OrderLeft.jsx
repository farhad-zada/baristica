import { useEffect, useReducer, useRef, useState } from 'react'
import InputText from '../../../components/form/inputField/InputText'
import PageText from '../../../content/PagesText.json'
import { useSelector } from 'react-redux'
import styles from './orderLeft.module.css'
import UserAddress from '../../../components/userAddress/UserAddress'
import AddAddress from '../../../components/userAddress/add/AddAddress'
import AuthButton from '../../../components/form/button/AuthButton'
import OrdersService from '../../../services/orders.service'
import Loading from '../../../components/loading/Loading'
import Error from '../../../components/error/Error'
import Success from '../../../components/success/Success'
import { Down } from '../../../icons'
import { handleApiReqRes } from '../../../utils/handleApiReqRes.util';
import { addressReducer } from '../../../utils/addressReducer';

const { order, profile } = PageText

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
    const datePickerRef = useRef(null)
    const timePickerRef = useRef(null)

    const { lang, finalCart, user, token } = useSelector((state) => state.baristica);

    const ordersService = new OrdersService()

    const localeByLang = {
        az: 'az-AZ',
        ru: 'ru-RU',
        en: 'en-US'
    };

    const relativeDayLabels = {
        az: { today: 'Bu gün', tomorrow: 'Sabah' },
        ru: { today: 'Сегодня', tomorrow: 'Завтра' },
        en: { today: 'Today', tomorrow: 'Tomorrow' }
    };

    const [selectionStart] = useState(() => new Date());

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const formatTime = (date) => {
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const toMinutes = (timeString) => {
        const [hours, minutes] = timeString.split(':').map(Number);
        return (hours * 60) + minutes;
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

    const getWorkingHours = (day) => {
        if (day === 0) return null;
        if (day === 6) return { start: '10:00', end: '14:00' };
        return { start: '09:00', end: '18:00' };
    };

    const roundToNextHalfHour = (date) => {
        const rounded = new Date(date);
        rounded.setSeconds(0, 0);
        const minutes = rounded.getMinutes();

        if (minutes === 0 || minutes === 30) return rounded;
        if (minutes < 30) {
            rounded.setMinutes(30);
            return rounded;
        }

        rounded.setHours(rounded.getHours() + 1);
        rounded.setMinutes(0);
        return rounded;
    };

    const getNextWorkingDay = (fromDate, includeToday = false) => {
        const cursor = new Date(fromDate);
        cursor.setHours(0, 0, 0, 0);
        if (!includeToday) {
            cursor.setDate(cursor.getDate() + 1);
        }

        while (!getWorkingHours(cursor.getDay())) {
            cursor.setDate(cursor.getDate() + 1);
        }

        return cursor;
    };

    const getSelectionWindowEnd = (fromDate = selectionStart) => {
        const includeToday = !getWorkingHours(fromDate.getDay());
        const targetDay = getNextWorkingDay(fromDate, includeToday);
        const targetHours = getWorkingHours(targetDay.getDay());
        const [endHour, endMinute] = targetHours.end.split(':').map(Number);

        const end = new Date(targetDay);
        end.setHours(endHour, endMinute, 0, 0);
        return end;
    };

    const selectionWindowEnd = getSelectionWindowEnd(selectionStart);

    const isDeliverySlotAllowed = (dateString, timeString) => {
        if (!dateString || !timeString) return false;

        const date = getDateFromIso(dateString);
        if (Number.isNaN(date.getTime())) return false;

        const workingHours = getWorkingHours(date.getDay());
        if (!workingHours) return false;

        const selected = toMinutes(timeString);
        const inDailyRange = selected >= toMinutes(workingHours.start) && selected <= toMinutes(workingHours.end);
        if (!inDailyRange) return false;

        const [hour, minute] = timeString.split(':').map(Number);
        const selectedDateTime = new Date(date);
        selectedDateTime.setHours(hour, minute, 0, 0);

        const roundedStart = roundToNextHalfHour(selectionStart);
        return selectedDateTime >= roundedStart && selectedDateTime <= selectionWindowEnd;
    };

    const getTimeOptionsForDate = (dateString, fromDate = selectionStart) => {
        if (!dateString) return [];

        const selectedDate = getDateFromIso(dateString);
        if (Number.isNaN(selectedDate.getTime())) return [];

        const workingHours = getWorkingHours(selectedDate.getDay());
        if (!workingHours) return [];

        const [startHour, startMinute] = workingHours.start.split(':').map(Number);
        const [endHour, endMinute] = workingHours.end.split(':').map(Number);

        const start = new Date(selectedDate);
        start.setHours(startHour, startMinute, 0, 0);

        const end = new Date(selectedDate);
        end.setHours(endHour, endMinute, 0, 0);

        let current = new Date(start);
        if (isSameDate(selectedDate, fromDate)) {
            const sameDayStart = roundToNextHalfHour(fromDate);
            if (sameDayStart > current) current = sameDayStart;
        }

        if (selectedDate > selectionWindowEnd) return [];
        if (isSameDate(selectedDate, selectionWindowEnd) && end > selectionWindowEnd) {
            end.setHours(selectionWindowEnd.getHours(), selectionWindowEnd.getMinutes(), 0, 0);
        }

        if (current > end) return [];

        const slots = [];
        while (current <= end) {
            slots.push(formatTime(current));
            current = new Date(current.getTime() + 30 * 60 * 1000);
        }

        return slots;
    };

    const buildDateOptions = (fromDate = selectionStart) => {
        const options = [];
        const cursor = new Date(fromDate);
        cursor.setHours(0, 0, 0, 0);
        const endDate = new Date(selectionWindowEnd);
        endDate.setHours(0, 0, 0, 0);
        const today = new Date(fromDate);
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        while (cursor <= endDate) {
            if (cursor.getDay() !== 0) {
                const value = formatDate(cursor);
                if (getTimeOptionsForDate(value, fromDate).length) {
                    let label = cursor.toLocaleDateString(localeByLang[lang] || 'en-US', {
                        weekday: 'short',
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    });

                    if (isSameDate(cursor, today)) {
                        label = relativeDayLabels[lang]?.today || 'Today';
                    } else if (isSameDate(cursor, tomorrow)) {
                        label = relativeDayLabels[lang]?.tomorrow || 'Tomorrow';
                    }

                    options.push({
                        value,
                        label
                    });
                }
            }
            cursor.setDate(cursor.getDate() + 1);
        }

        return options;
    };

    const dateOptions = buildDateOptions(selectionStart);
    const timeOptions = getTimeOptionsForDate(formData.date, selectionStart);
    const selectedDateLabel = dateOptions.find((option) => option.value === formData.date)?.label || '';
    const selectedTimeLabel = formData.time || '';

    const getSelectedAddressId = () => {
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
    };

    const validateDeliveryFields = (dateValue, timeValue) => {
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

        const timesForDate = getTimeOptionsForDate(dateValue, selectionStart);
        const timeIsAvailable = timesForDate.includes(timeValue);
        if (!timeIsAvailable || !isDeliverySlotAllowed(dateValue, timeValue)) {
            errors.time = content?.deliveryTimeInvalidError || 'Selected time is outside delivery hours';
        }

        return errors;
    };

    const validateOrderFields = (nextFormData, isDelivery, selectedAddressId) => {
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
    };

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
                deliveryHour: formData.time,
                deliveryDate: formData.date
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
        const defaultDate = dateOptions[0]?.value || '';
        const defaultTime = defaultDate ? (getTimeOptionsForDate(defaultDate, selectionStart)[0] || '') : '';
        const hasUser = user && Object.keys(user).length > 0;

        dispatch({ type: 'INIT', payload: hasUser ? (user.addresses || []) : [] });

        setFormData((prev) => ({
            ...prev,
            name: hasUser ? (user.name || prev.name || "") : prev.name,
            phone: hasUser ? (user.phone || prev.phone || "") : prev.phone,
            date: prev.date || defaultDate,
            time: prev.time || defaultTime
        }));
    }, [user])

    useEffect(() => {
        if (!delivery) {
            setFieldErrors((prev) => ({ ...prev, date: '', time: '', address: '' }));
            setSubmitAttempted(false);
            return;
        }

        if (!formData.date || !timeOptions.length) return;
        if (timeOptions.includes(formData.time)) return;

        setFormData((prev) => ({ ...prev, time: timeOptions[0] }));
    }, [delivery, formData.date, formData.time, timeOptions])

    useEffect(() => {
        if (!submitAttempted) return;
        const selectedAddressId = getSelectedAddressId();
        setFieldErrors(validateOrderFields(formData, delivery, selectedAddressId));
    }, [addresses, delivery, formData, submitAttempted])

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
                                                        const nextTimeOptions = getTimeOptionsForDate(selectedDate, selectionStart);
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
                                                    {timeOption}
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
