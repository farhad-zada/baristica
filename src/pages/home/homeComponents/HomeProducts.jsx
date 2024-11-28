import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import pagesText from '../../../content/PagesText.json'
import HomeProductsList from '../../../components/productsSlider/HomeProductsList';
import ProductsSection from '../../../components/productsSection/ProductsSection';
import ProductsService from '../../../services/products.service';
import Loading from '../../../components/loading/Loading';
const { productsSection } = pagesText

export default function HomeProducts() {
    const { lang, token } = useSelector((state) => state.baristica);

    const [newCoffe, setNewCoffee] = useState([])
    const [popularCoffee, setPopularCoffee] = useState([])

    const [newMachines, setNewMachines] = useState([])
    const [popularMachines, setPopularMachines] = useState([])

    const [newAccesories, setNewAccesories] = useState([])
    const [popularAccesories, setPopularAccesories] = useState([])

    const [loading,setLoading] = useState(false)

    const sectionsContent = [
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
    ]

    const productsService = new ProductsService

    const setProducts = async (token) => {
        setLoading(true)
        try {
            const [newCoffe, popularCoffee, newAccesory, popularAccesory, newMachines, popularMachines] = await Promise.all([
                productsService.getProductsByType(token, 'Coffee', 'new'),
                productsService.getProductsByType(token, 'Coffee', 'popular'),
                productsService.getProductsByType(token, 'Accessory', 'new'),
                productsService.getProductsByType(token, 'Accessory', 'popular'),
                productsService.getProductsByType(token, 'Machine', 'new'),
                productsService.getProductsByType(token, 'Machine', 'popular'),
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
            console.error('Error fetching products:', error);
        } finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        if (token) {
            setProducts(token)
        }
    }, [token])
    return (
        <>
        <Loading status={loading} />
            {sectionsContent.map((section) => (
                <ProductsSection
                    heading={section.heading}
                    tabs={section.tabs}
                    navigateTo={section.navigateTo}
                    content={section.content}
                />
            ))}
        </>
    )
}
