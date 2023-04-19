import { Button, Space } from 'antd'
import css from './Game.module.css'
import { useState } from 'react';

export const Game = () => {
    const player1Name: string = 'Player 1'
    const player2Name: string = 'Player 2'
    let [count1, setCount1] = useState<number>(10)
    let [count2, setCount2] = useState<number>(12)



    return <div className={css.gamePage}>
        Game
        <h3>Counter</h3>
        <div className={css.wrapper}>
            <div className={css.player}>
                <Space direction="vertical">
                    <span>{player1Name}</span>
                    {count1}
                    <Button type='primary' shape="circle" loading={false} onClick={
                        () => {
                            setCount1((actual) => actual + 1)

                        }
                    }>+</Button>
                </Space>
            </div>
            <div className={css.player}>
                <Space direction="vertical">
                    <span>{player2Name}</span>
                    {count2}
                    <Button type='primary' shape="circle" loading={false} onClick={
                        () => {
                            setCount2((actual) => actual + 1)

                        }
                    }>+</Button>
                </Space>
            </div>
        </div>
        <Space direction="vertical">
            <div>
                <Button type='primary' shape="circle" onClick={
                    () => {
                        setCount1((actual) => actual - 1)
                        setCount2((actual) => actual - 1)
                    }
                }>-</Button>
                <Button type='primary' shape="circle" onClick={
                    () => {
                        setCount1(10)
                        setCount2(10)
                    }
                }>reset</Button>
            </div>

        </Space>



    </div >

}


export const Game_ = () => {
    const player1Name: string = 'Player 1'
    const player2Name: string = 'Player 2'

    let [counters, setCounters] = useState(()=>{ // можно положить функцию с объектом, можно просто объект
        return {c1: 10,
        c2: 10}

    })

    return <div className={css.gamePage}>
        Game
        <h3>Counter</h3>
        <div className={css.wrapper}>
            <div className={css.player}>
                <Space direction="vertical">
                    <span>{player1Name}</span>
                    {counters.c1}
                    <Button type='primary' shape="circle" loading={false} onClick={
                        () => {
                            setCounters((actual) => {
                                return { ...actual, c1: actual.c1 + 1 }
                            })

                        }
                    }>+</Button>
                </Space>
            </div>
            <div className={css.player}>
                <Space direction="vertical">
                    <span>{player2Name}</span>
                    {counters.c2}
                    <Button type='primary' shape="circle" loading={false} onClick={
                        () => {
                            setCounters((actual) => {
                                return { ...actual, c2: actual.c2 + 1 }
                            })

                        }
                    }>+</Button>
                </Space>
            </div>
        </div>

        <Space direction="vertical">
            <div>
                <Button type='primary' shape="circle" onClick={() => {
                    setCounters((actual) => {
                        return { ...actual, c1: actual.c1 - 1, c2: actual.c2 - 1 }
                    })


                }
                }>-</Button>
                <Button type='primary' shape="circle" onClick={() => {
                    setCounters((actual) => {
                        return { ...actual, c1: 10, c2: 10 }
                    })

                }
                }>reset</Button>
            </div>

        </Space>


    </div >

}
