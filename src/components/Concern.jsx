import { useState } from 'react';

const Concern = ({ concernTitle, concernText }) => {
    const [opened, setOpened] = useState(false);
    const toggle = () => setOpened(!opened);

    return (
        <div className = "parent">
            <div onClick={toggle} className={"concern-container " + (opened ? 'title-opened' : '')}>
            <h3 className='concern-title'>{concernTitle}</h3>
                <img
                    src="/downarrow.svg"
                    alt="toggle arrow"
                    className={`toggle-arrow ${opened ? 'opened' : 'closed'}`}
                />
            </div>
            {opened && <p className={`concern-text ${opened ? 'opened' : ''}`}>{concernText}</p>}
        </div>
    );
}

export default Concern;