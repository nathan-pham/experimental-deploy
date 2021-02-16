import { useState } from "react"

const ToggleSwitch = ({ initial=false, label, ...props }) => {
    const [check, setCheck] = useState(initial)
    const toggle = () => setCheck(state => !state)

    return (
        <div className={["toggle-switch", check ? "checked" : "unchecked"].join(' ')}>
            <input type="checkbox" class="switch-checkbox" name="toggle-switch" checked={check} onClick={toggle} {...props} />
            <div className="toggle-ball"></div>
            {
                label
                    ? <label class="toggle-switch-label" for="toggle-switch">{label}</label>
                    : null
            }
        </div>
    )
}

export default ToggleSwitch