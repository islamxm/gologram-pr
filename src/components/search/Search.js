import './Search.scss';
import { useState, useEffect } from 'react';
import {SearchOutlined,
        CloseCircleOutlined,
        } from '@ant-design/icons';
import {Dropdown} from 'antd';
import SearchList from './SearchList';


const Search = () => {
    const [searchValue, setSearchValue] = useState('');
    const [btnVis, setBtnVis] = useState(true);

    const searchHandle = (e) => {
        setSearchValue(e.target.value);
    }

    const focusHandle = (e) => {
        setBtnVis(false);
    }

    const blurHandle = (e) => {
        setBtnVis(true);
    }

    const resetHandle = () => {
        setSearchValue('');
    }

    useEffect(() => {
        console.log(searchValue);
    }, [searchValue])
    

    return (
        <div className="search">
            <Dropdown
                overlay={<SearchList/>}
                trigger={['click']}
                >
                <div className="search__main">
                    <button className={"search__main_btn search__main_btn-glass " + (!btnVis ? 'hidden' : '')}>
                        <SearchOutlined/>
                    </button>
                    <input 
                        type="text" 
                        // name='search' 
                        value={searchValue}
                        placeholder='поиск' 
                        onChange={(e) => searchHandle(e)}
                        onBlur={(e) => blurHandle(e)}
                        onFocus={(e) => focusHandle(e)}/>
                    <button onClick={resetHandle} className={'search__main_btn search__main_btn-reset ' + (!btnVis ? 'active' : '')}>
                        <CloseCircleOutlined />
                    </button>
                </div>
            </Dropdown>
        </div>
    )
}

export default Search;