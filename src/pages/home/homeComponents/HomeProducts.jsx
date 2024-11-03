import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import pagesText from '../../../content/PagesText.json'
import HomeProductsList from '../../../components/productsSlider/HomeProductsList';
import ProductsSection from '../../../components/productsSection/ProductsSection';
const { productsSection } = pagesText

export default function HomeProducts() {
    const { lang } = useSelector((state) => state.baristica);

    const [newCoffe, setNewCoffee] = useState([1,2,3,4])
    const [popularCoffee, setPopularCoffee] = useState([1,2])

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
                [productsSection[lang].coffeeMachine[0].label]: <HomeProductsList products={newCoffe} />,
                [productsSection[lang].coffeeMachine[1].label]: <HomeProductsList products={popularCoffee} />
            }
        },
        {
            heading: lang ? productsSection[lang].accesories : '',
            tabs: lang ? productsSection[lang].coffeeOrAccesories : [],
            navigateTo: '/products/accesories',
            content: {
                [productsSection[lang].coffeeOrAccesories[0].label]: <HomeProductsList products={newCoffe} />,
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
