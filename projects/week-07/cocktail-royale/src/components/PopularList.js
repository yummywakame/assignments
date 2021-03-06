import React, { Component } from 'react'
import { withListData } from '../context/BigDataProvider.js'
import DrinkThumb from './DrinkThumb.js'

class PopularList extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        // get only the data for components specified in componentList
        this.props.setComponentList(["popular"])
        // set the page title
        document.title = "Cocktail Royale | Popular Cocktails"
    }

    render() {

        return (
            <main className="container">

                <h1 className="glow">Popular Cocktails</h1>
                <div id="drink-list" className="row">
                    {this.props.popularList.map((item) => <DrinkThumb {...item} {...this.props} key={item.idDrink} />)}
                </div>

            </main>
        )
    }
}

export default withListData(PopularList)