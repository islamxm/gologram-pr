import emojiData from "./emojiData";
import './EmojiList.scss';

const EmojiList = ({handleEmoji}) => {

    
    return (
        <div className="emojiList">
            <div className="emojiList__part">
                <div className="emojiList__part_head">Полпулярные</div>
                <div className="emojiList__part_list">
                    {
                        emojiData.popular.map(emoji => (
                            <div 
                                className="emojiList__part_item" 
                                data-emoji={emoji.label}
                                key={emoji.code}
                                onClick={(e) => handleEmoji(e.target.dataset.emoji)}>{emoji.label}</div>
                        ))
                    }
                    
                </div>
            </div>
            <div className="emojiList__part">
                <div className="emojiList__part_head">Все</div>
                <div className="emojiList__part_list">
                    {
                        emojiData.all.map(emoji => (
                            <div 
                                className="emojiList__part_item"
                                data-emoji={emoji.label}
                                key={emoji.label}
                                onClick={(e) => handleEmoji(e.target.dataset.emoji)}>{emoji.label}</div>
                                
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
export default EmojiList;