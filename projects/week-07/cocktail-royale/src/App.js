import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { withRouter } from 'react-router';
import LoadOverlay from './components/LoadOverlay.js'
import WelcomeSplash from './components/WelcomeSplash.js'
import { Input, Button } from 'react-materialize'
import BigDataProvider, { withListData } from './context/BigDataProvider.js'
import Menu from './components/Menu.js'
import PopularList from './components/PopularList.js'
import RecentList from './components/RecentList.js'
import NonAlcoholicList from './components/NonAlcoholicList.js'
import DrinkDetail from './components/DrinkDetail.js'
import SearchResultsIng from './components/SearchResultsIng.js'
import SearchResultsStr from './components/SearchResultsStr.js'

// Stylesheets
import './materialize.css'
import './styles.css'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            welcomeHidden: false,
            searchIngredients: '',
            searchString: ''
        }
    }

    componentDidMount() {
        // get only the data for components specified in componentList
        this.props.getListData()

        // show welcome message div for 3 seconds
        setTimeout(() => { this.hideWelcomeMessage() }, 0)
    }

    componentWillUnmount() {

    }

    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    handleSubmitIngredientSearch = (event) => {
        event.preventDefault()
        // submit the query to the db
        this.props.setSearchType("ingredients", this.state.searchIngredients)

        // Redirect to the Search Results component
        this.props.history.push(`/results/ingredients/${this.state.searchIngredients}`)

        // Reset the form input values for the user
        this.setState({
            searchIngredients: ''
        })
    }

    handleSubmitStringSearch = (event) => {
        event.preventDefault()
        // submit the query to the db
        this.props.setSearchType("string", this.state.searchString)

        // Redirect to the Search Results component
        this.props.history.push(`/results/cocktails/${this.state.searchString}`)

        // Reset the form input values for the user
        this.setState({
            searchString: ''
        })
    }

    hideWelcomeMessage = () => {
        this.setState({
            welcomeHidden: true
        })
    }

    render() {

        return (
            <div id="container">

                <WelcomeSplash welcomeHidden={this.state.welcomeHidden} />

                <LoadOverlay />

                <header>
                    {/* <Menu setComponentList={() => this.props.setComponentList()} /> */}
                    <Menu />

                    <div id="search-container">
                        <div className="row">

                            <div className="col s12 m6">

                                <form onSubmit={this.handleSubmitIngredientSearch}>
                                    <div className="col s12">

                                        <div className="select-wrapper col s10">
                                            <div className="input-field">
                                                <Input s={12} type='select' name="searchIngredients" value={this.state.searchIngredients} onChange={this.handleChange} required >
                                                    <option value=''>Search by ingredients...</option>
                                                    {this.props.ingredientsList.map((item, key) =>
                                                        <option key={key} value={item.strIngredient1.split(' ').join('_')}>{item.strIngredient1}</option>
                                                    )}
                                                </Input>
                                            </div>
                                        </div>

                                        <div className="button-wrapper col s2">
                                            <Button waves='light' className="pink" icon='search'></Button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <div className="col s12 m6">

                                <form onSubmit={this.handleSubmitStringSearch}>
                                    <div className="col s12">

                                        <div className="search-wrapper col s10">
                                            <div className="input-field">
                                                <Input s={12} type="text" name="searchString" value={this.state.searchString} placeholder="Cocktail name..." onChange={this.handleChange} required />
                                            </div>
                                        </div>

                                        <div className="button-wrapper col s2">
                                            <Button waves='light' className="pink" icon='search'></Button>
                                        </div>
                                    </div>
                                </form>

                            </div>

                        </div>
                    </div>

                </header>

                <Switch>
                    <Route exact path='/' component={PopularList} />
                    <Route exact path='/popular' component={PopularList} />
                    <Route path='/latest' component={RecentList} />
                    <Route path='/non-alcoholic' component={NonAlcoholicList} />
                    <Route path='/cocktail/:_id' component={DrinkDetail} />
                    <Route path='/results/cocktails/:_id' component={SearchResultsStr} />
                    <Route path='/results/ingredients/:_id' component={SearchResultsIng} />
                    <Route path='/roulette/:_id' component={DrinkDetail} />
                </Switch>

            </div>
        )
    }
}

export default withRouter(withListData(App))