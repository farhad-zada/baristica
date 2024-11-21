import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import pagesText from '../../../content/PagesText.json'
import HomeProductsList from '../../../components/productsSlider/HomeProductsList';
import ProductsSection from '../../../components/productsSection/ProductsSection';
const { productsSection } = pagesText

export default function HomeProducts() {
    const { lang, cart } = useSelector((state) => state.baristica);
    console.log(cart)
    const [newCoffe, setNewCoffee] = useState([
        {
            id: 1,
            type:'coffee'
        },
        {
            id: 2,
            type:'coffee'
        },
        {
            id: 3,
            type:'coffee'
        }
    ])
    const [popularCoffee, setPopularCoffee] = useState([
        {
            id: 1,
            type:'coffee'
        },
        {
            id: 2,
            type:'coffee'
        }
    ])

    const [newMachines, setNewMachines] = useState([
        {
            id: 1,
            type:'machine'
        },
        {
            id: 2,
            type:'machine'
        },
        {
            id: 3,
            type:'machine'
        }
    ])

    const [newAccesories, setNewAccesories] = useState([
        {
            id: 1,
            type:'accesories'
        },
        {
            id: 2,
            type:'accesories'
        },
        {
            id: 3,
            type:'accesories'
        }
    ])

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
                [productsSection[lang].coffeeMachine[1].label]: <HomeProductsList products={popularCoffee} />
            }
        },
        {
            heading: lang ? productsSection[lang].accesories : '',
            tabs: lang ? productsSection[lang].coffeeOrAccesories : [],
            navigateTo: '/products/accesories',
            content: {
                [productsSection[lang].coffeeOrAccesories[0].label]: <HomeProductsList products={newAccesories} />,
                [productsSection[lang].coffeeOrAccesories[1].label]: <HomeProductsList products={popularCoffee} />
            }
        }
    ]


    return (
        <>
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
