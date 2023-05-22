import { useEffect, useState } from "react"
import css from './Paginator.module.css'
import { ExclamationCircleOutlined, SyncOutlined } from "@ant-design/icons"

type PageNumberSettingsPropsType = {
    pagesInput: boolean
    value: number
    onSubmit: (fixedValue: number) => void
    settings: (isVisible: boolean) => void
    maxNumber: number
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
                        onChange={(e) => { setTempNumber(+e.currentTarget.value) }}
                    />

                    <button onClick={() => {
                        if (tepmNumber !== null) {
                            props.onSubmit(tepmNumber)
                        }
                        props.settings(false)
                    }} disabled={tepmNumber > props.maxNumber} style={{height:'10px'}}>
                        
                        {tepmNumber > props.maxNumber ? <SyncOutlined spin style={{ fontWeight: 'bold', marginTop: '-60px' }} /> : 'Apply'}
                        
                    </button>

                    <p> (max = {props.maxNumber}) </p>
                    {tepmNumber > props.maxNumber &&
                        <div className={css.errorSign} >
                            <div className={css.errorSignPic}> 
                            {/* <img src={sign} alt="" /> */}
                                <ExclamationCircleOutlined style={{ color:"#ff0000c0", marginRight:'5px', fontWeight:'bold' }} />
                            </div>
                            Error: you have exceeded max number!!!

                        </div>


                    }

                </div>
            }

        </div>

    )
}