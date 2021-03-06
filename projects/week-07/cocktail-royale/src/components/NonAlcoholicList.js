import React, { Component } from 'react'
import { withListData } from '../context/BigDataProvider.js'
import DrinkThumb from './DrinkThumb.js'

class NonAlcoholicList extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        // get only the data for components specified in componentList
        this.props.setComponentList(["nonalcoholic"])
        // set the page title
        document.title = "Cocktail Royale | Non-Alcoholic Cocktails"
    }

    render() {

        return (
            <main className="container">

                <h1 className="glow">Non-Alcoholic Cocktails</h1>
                <div id="drink-list" className="row">

                    {this.props.nonAlcoholicList.map((item) => <DrinkThumb {...item} {...this.props} key={item.idDrink} />)}

                </div>

            </main>
        )
    }

}

export default withListData(NonAlcoholicList)