import { useEffect, useState } from "react"
import css from './Paginator.module.css'

type PageNumberSettingsPropsType = {
    pagesInput: boolean
    value: number
    onSubmit: (fixedValue: number) => void
    settings: (isVisible: boolean) => void
}

export const PageNumberSetting = (props: PageNumberSettingsPropsType) => {
    const [tepmNumber, setTempNumber] = useState<number>(5)
    useEffect(() => {
        setTempNumber(props.value)
    }, [props.value])

    return (
        <div >
            {props.pagesInput &&
                <div className={css.settingPageSize}>
                    <span> Enter number of items per page </span>
                    <input placeholder='list count'
                        type={'number'}
                        value={tepmNumber}
                        onChange={(e) => { setTempNumber(+e.currentTarget.value) }} />

                    <button onClick={() => {
                        if (tepmNumber !== null) {
                            props.onSubmit(tepmNumber)
                        }
                        props.settings(false)
                    }}>Apply</button>
                    <p> (max = 100) </p>
                </div>
            }

        </div>

    )
}