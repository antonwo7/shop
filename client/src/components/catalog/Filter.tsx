import React, {ChangeEvent, useState, MouseEvent} from 'react'
import {productAPI} from "../../api/product"
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import {TFilterState} from '../../store/reducers/filterSlice';
import classNames from "classnames";

const defaultFilterState: TFilterState = {}

type TFilterComponentState = {
    setFilter: (filter: TFilterState) => void
    defaultFilter?: TFilterState
}

const Filter = ({setFilter, defaultFilter}: TFilterComponentState) => {
    const {data: categories, isLoading: isCategoriesLoading} = productAPI.useGetCategoriesQuery()
    const {data: properties, isLoading: isPropertiesLoading} = productAPI.useGetPropertiesQuery()

    const normalizeProperties = (properties?: string | string[]): string[] => {
        let normalizedProperties: any[];
        switch (typeof properties) {
            case 'undefined' : normalizedProperties = []; break;
            case 'string' : normalizedProperties = [properties]; break;
            case 'object' : normalizedProperties = [...properties]; break;
        }
        return normalizedProperties;
    }

    const [state, setState] = useState<TFilterState>(defaultFilter
        ? {
            ...defaultFilter,
            properties: normalizeProperties(defaultFilter.properties),
            categories: normalizeProperties(defaultFilter.categories),
        }
        : defaultFilterState)

    const getUniquePropertyNames = () => {
        if (!properties) return [];
        return (properties as any[]).reduce((accum, cur) => {
            if (!accum.includes(cur.name)) {
                accum.push(cur.name)
            }
            return accum;
        }, [])
    }



    const onPriceChange = (e: number | number[]) => {
        if (Array.isArray(e))
            setState({...state, priceMin: e[0], priceMax: e[1]})
    }

    const onCategoryChange = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        const catId = e.currentTarget.dataset.catid
        if (catId === undefined) return;

        let categories: string[];
        if (state.categories === undefined) {
            categories = [catId]
        } else {
            categories = !state.categories.includes(catId)
                ? [...state.categories, catId]
                : state.categories.filter(id => id !== catId)
        }

        setState({...state, categories})
        setFilter({categories} as TFilterState)
    }

    const onPropertyChange = (e: ChangeEvent<HTMLInputElement>) => {
        const properties = e.currentTarget.checked
            ? [...(state?.properties || []), e.target.value]
            : (state?.properties || []).filter(item => item !== e.target.value)
        setState({...state, properties})
    }

    const onResetFilter = () => {
        setState(defaultFilterState)
        setFilter({})
    }

    const onApplyFilter = () => {
        setFilter(state)
    }

    return (
        <>
            <div className="section-sb">
                <div className="section-sb-current">
                    {categories && categories.map(category => {
                        return <div key={category._id}>
                            <h3>
                                <div className="categ-parent" data-catid={category._id}>
                                    <span className="categ-1-label">{category.name}</span>
                                    {/*<span id="section-sb-toggle" className="section-sb-toggle">*/}
                                    {/*    <span className="section-sb-ico" />*/}
                                    {/*</span>*/}
                                </div>
                            </h3>
                            {category.categories && (
                                <ul className="section-sb-list" id="section-sb-list">
                                    {category.categories.map(subCategory => (
                                        <li className={classNames('categ-1', {active: state.categories?.includes(subCategory._id)})} key={subCategory._id}>
                                            <a href="#" onClick={onCategoryChange} data-catid={subCategory._id}>
                                                <span className="categ-1-label">{subCategory.name}</span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    })}
                </div>
                <div className="section-filter">
                    <button id="section-filter-toggle" className="section-filter-toggle" data-close="Hide Filter" data-open="Show Filter">
                        <span>Show Filter</span>
                        <i className="fa fa-angle-down" />
                    </button>
                    <div className="section-filter-cont">
                        {/*<div className="section-filter-price">*/}
                        {/*    <div className="range-slider section-filter-price" data-min="0" data-max="1000" data-from="200" data-to="800" data-prefix="$" data-grid="false" />*/}
                        {/*</div>*/}

                        <div className="section-filter-item opened">
                            <p className="section-filter-ttl">Price</p>
                            <div className="section-filter-price">
                                <Slider
                                    range
                                    min={0}
                                    max={10000}
                                    step={1}
                                    defaultValue={[state?.priceMin || 0, state?.priceMax || 10000]}
                                    onChangeComplete={onPriceChange}
                                />
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <span>{state?.priceMin || 0}</span>
                                    <span>{state?.priceMax || 10000}</span>
                                </div>
                            </div>
                        </div>


                        {properties && getUniquePropertyNames().map((name: string, i: number) => <div key={i} className="section-filter-item opened">
                            <p className="section-filter-ttl">{name} <i className="fa fa-angle-down" /></p>
                            <div className="section-filter-fields">
                                {properties.filter(p => p.name === name).map(property => <p key={property._id} className="section-filter-field">
                                    <input id={`property_${property._id}`} value={property._id} type="checkbox" checked={state?.properties && state.properties.includes(property._id)} onChange={onPropertyChange} />
                                    <label className="section-filter-checkbox" htmlFor={`property_${property._id}`}>{property.value}</label>
                                </p>)}
                            </div>
                        </div>)}

                        <div className="section-filter-buttons">
                            <input className="btn btn-themes" id="set_filter" name="set_filter" value="Apply filter" type="button" onClick={onApplyFilter} />
                            <input className="btn btn-link" id="del_filter" name="del_filter" value="Reset" type="button" onClick={onResetFilter}  />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Filter;