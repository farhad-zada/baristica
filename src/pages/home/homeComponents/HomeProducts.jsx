import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

import pagesText from '../../../content/PagesText.json'
import HomeProductsList from '../../../components/productsSlider/HomeProductsList';
import ProductsSection from '../../../components/productsSection/ProductsSection';
import ProductsService from '../../../services/products.service';
import Loading from '../../../components/loading/Loading';
import Error from '../../../components/error/Error';
const { productsSection } = pagesText

export default function HomeProducts() {
    const { lang, token } = useSelector((state) => state.baristica);

    const [newCoffe, setNewCoffee] = useState([])
    const [popularCoffee, setPopularCoffee] = useState([])

    const [newMachines, setNewMachines] = useState([])
    const [popularMachines, setPopularMachines] = useState([])

    const [newAccesories, setNewAccesories] = useState([])
    const [popularAccesories, setPopularAccesories] = useState([])

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const sectionsContent = useMemo(() => [
        {
            heading: lang ? productsSection[lang].coffeeHeading : '',
            tabs: lang ? productsSection[lang].coffeeOrAccesories : [],
            navigateTo: '/products/coffee',
            content: {
                [productsSection[lang].coffeeOrAccesories[0].label]: <HomeProductsList products={newCoffe} />,
                [productsSection[lang].coffeeOrAccesories[1].label]: <HomeProductsList products={popularCoffee} />
            }
        },
        {
            heading: lang ? productsSection[lang].coffeeMachineHeading : '',
            tabs: lang ? productsSection[lang].coffeeMachine : [],
            navigateTo: '/products/coffeeMachines',
            content: {
                [productsSection[lang].coffeeMachine[0].label]: <HomeProductsList products={newMachines} />,
                [productsSection[lang].coffeeMachine[1].label]: <HomeProductsList products={popularMachines} />
            }
        },
        {
            heading: lang ? productsSection[lang].accesories : '',
            tabs: lang ? productsSection[lang].coffeeOrAccesories : [],
            navigateTo: '/products/accesories',
            content: {
                [productsSection[lang].coffeeOrAccesories[0].label]: <HomeProductsList products={newAccesories} />,
                [productsSection[lang].coffeeOrAccesories[1].label]: <HomeProductsList products={popularAccesories} />
            }
        }
    ], [lang, newCoffe, popularCoffee, newMachines, popularMachines, newAccesories, popularAccesories])

    const productsService = new ProductsService()

    const setProducts = useCallback(async (token) => {
        setLoading(true)
        try {
            const [newCoffe, popularCoffee, newAccesory, popularAccesory, newMachines, popularMachines] = await Promise.all([
                productsService.getProductsByType(token,'key' ,'Coffee', 'new'),
                productsService.getProductsByType(token,'key', 'Coffee', 'popular'),
                productsService.getProductsByType(token,'key', 'Accessory', 'new'),
                productsService.getProductsByType(token,'key', 'Accessory', 'popular'),
                productsService.getProductsByType(token,'key', 'Machine', 'new'),
                productsService.getProductsByType(token,'category', 'Machine', 'grinder'),
            ]);
            // coffee
            setNewCoffee(newCoffe.data);
            setPopularCoffee(popularCoffee.data); // Assuming you want to set popular coffee data as well
            //accesories
            setNewAccesories(newAccesory.data)
            setPopularAccesories(popularAccesory.data)
            // machines
            setNewMachines(newMachines.data)
            setPopularMachines(popularMachines.data)
        } catch (error) {
            setError(true)
        } finally {
            setLoading(false)
        }
    }, [productsService])

    useEffect(() => {
        setProducts(token)
    }, [token])

    return (
        <>
            <Loading status={loading} />
            <Error status={error} setStatus={setError} />
            {sectionsContent.map((section, key) => (
                <ProductsSection
                    key={key}
                    heading={section.heading}
                    tabs={section.tabs}
                    navigateTo={section.navigateTo}
                    content={section.content}
                />
            ))}
        </>
    )
}
