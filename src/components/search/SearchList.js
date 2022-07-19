import testData from "./testData";
import {Link} from 'react-router-dom';
import {Avatar} from 'antd';
import {
    CheckCircleFilled} from '@ant-design/icons';

const SearchList = ({list}) => {
    return (
        <div className="search__list custom-scroll">
            {
                testData.map((user, index) => (
                    <Link to={'/profile-self'} className='search__item' key={index}>
                        <Avatar
                            size={40}
                            src={user.avatar}
                            className={'search__item_avatar'}/>
                        <div className="search__item_body">
                            <div className="search__item_body_main">
                            <span className="search__item_body_username">{user.username}</span>
                            {
                                user.is_confirmed ? (
                                    <span className="search__item_body_confirmed"><CheckCircleFilled /></span>
                                ) : null
                            }
                            </div>
                            {
                                user.is_following ? (
                                    <div className="search__item_body_status">
                                        <span>• Подписки</span>
                                    </div>
                                ) : null
                            }
                            
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}

export default SearchList;