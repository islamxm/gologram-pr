import {SearchOutlined} from '@ant-design/icons';

import './Search.scss';

const Search = () => {
    return (
        <div className="search">
            <div className="search__main">
                <button className="search__main_btn">
                    <SearchOutlined/>
                </button>
                <input type="text" name='search' placeholder='поиск'/>
            </div>
        </div>
    )
}

export default Search;