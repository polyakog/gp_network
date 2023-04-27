import { useEffect, useState } from 'react'
import css from './Github.module.css'
import { SettingOutlined } from '@ant-design/icons';
import axios from 'axios'
import Paginator from '../../common/Paginator/Paginator'
import { Helmet } from 'react-helmet-async';


type SearchUserDataType = {
    login: string
    id: number
}

type SearchResultType = {
    items: SearchUserDataType[]
    total_count: number
}

type UserType = {
    login: string
    id: number
    avatar_url: string
    html_url: string
    name: string
    followers: number
    bio: string
    repos_url: string
}

type SearchPropsType = {
    value: string
    onSubmit: (fixedValue: string) => void

}
export const Search = (props: SearchPropsType) => {
    const [tepmSearch, setTempSearch] = useState<string>('')
    useEffect(() => {
        setTempSearch(props.value)
    }, [props.value])

    return (
        <div className={css.searchWrapper}>
            <input placeholder='search'
                value={tepmSearch}
                onChange={(e) => { setTempSearch(e.currentTarget.value) }} />
            <button onClick={() => {
                if (tepmSearch !== '') {
                    props.onSubmit(tepmSearch)
                }

            }}>find</button>
        </div>
    )
}

type UsersListPropType = {
    term: string
    selectedUser: SearchUserDataType | null
    onUserSelected: (user: SearchUserDataType) => void
    per_page: number
    page: number
    usersCount: (count: number) => void


}
export const UsersList = (props: UsersListPropType) => {
    const [users, setUsers] = useState<SearchUserDataType[]>([])

    useEffect(() => {
        console.log('SYNC USERS', props.term)
        axios
            .get<SearchResultType>(`https://api.github.com/search/users?q=${props.term}&per_page=${props.per_page}&page=${props.page}`)
            .then(res => {
                setUsers(res.data.items)
                props.usersCount(res.data.total_count)
            })
    }, [props.term, props.page, props.per_page])

    return (
        <ul>
            {users
                .map((u, index) => <li key={u.id} className={props.selectedUser === u ? css.selected : ''}
                    onClick={() => {
                        props.onUserSelected(u)
                    }}>
                    {(props.page - 1) * props.per_page + index + 1}. {u.login}
                </li>)
            }
        </ul>
    )
}

type TimerPropsType = {
    seconds: number
    onChange: (actualSeconds: number) => void
    timerKey: string
}
export const Timer = (props: TimerPropsType) => {
    const [seconds, setSeconds] = useState(props.seconds)
    useEffect(() => {
        setSeconds(props.seconds)
    }, [props.seconds])

    useEffect(() => {
        props.onChange(seconds)
    }, [seconds])

    useEffect(() => {
        const intervalId = setInterval(() => {
            console.log('TICK')
            setSeconds((prev) => (prev) - 1)
        }, 1000)
        return () => { clearInterval(intervalId) }
    }, [props.timerKey])

    return <div>{seconds}</div>
}

type UserDetailsPropsType = {
    user: SearchUserDataType | null
}

const startTimerSeconds = 10

export const UserDetails = (props: UserDetailsPropsType) => {
    const [userDetails, setUserDetails] = useState<null | UserType>(null)
    const [seconds, setSeconds] = useState(startTimerSeconds)

    useEffect(() => {
        if (seconds < 1) { setUserDetails(null) }
    }, [seconds])

    useEffect(() => {
        console.log('SYNC USER DATAILS')
        if (!!props.user) {
            axios
                .get<UserType>(`https://api.github.com/users/${props.user.login}`)
                .then(res => {
                    setSeconds(startTimerSeconds)
                    setUserDetails(res.data)

                })
        }
    }, [props.user])

    return (

        <div>
            {userDetails && <div>
                <Timer seconds={seconds} onChange={setSeconds} timerKey={userDetails.id.toString()} />
                <h3>Details</h3>

                <img src={userDetails.avatar_url} alt="avatar" />
                <ul>
                    <li style={{ fontSize: '25px' }}>{userDetails?.login}</li>
                    <li>{userDetails?.bio}</li>
                    <li> profile: {userDetails?.html_url}</li>
                    {/* <li> repositories: {userDetails?.repos_url}</li> */}
                    <li>{userDetails?.followers} followers</li>
                </ul>
            </div>
            }
        </div>
    )
}

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
                    <span> Enter number of users per page </span>
                    <input placeholder='search'
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
export const Github = () => {
    const initialValue = 'polyakog'
    const [selectedUser, setSelectedUser] = useState<SearchUserDataType | null>(null)
    const [searchTerm, setSearchTerm] = useState(initialValue)

    const [totalUsersCount, setTotalUsersCount] = useState(100)
    const [pageSize, setPageSize] = useState(5)
    const [currentPage, setCurrentPage] = useState(2)
    const [pagesInput, setPageInput] = useState(false)
    const onPageChanged = (pageNumber: number) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        console.log('SYNC TAB TITLE')
        const prevTitle = document.title
        if (selectedUser) {
            document.title = selectedUser.login
        }
        return () => {
            document.title = prevTitle
        }

    }, [selectedUser])

    const onPageSizeHandling = () => {
        setPageInput(true)

    }



    return <div className={css.container}>
        {/* <Helmet>
            <title> Github page</title>
        </Helmet> */}
        <h2> Github</h2>
        <img src="https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/github-512.png" alt='' />
        <div className={css.wrapper}>

            <div className={css.sidebar}>
                <Paginator totalItemsCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage} onPageChanged={onPageChanged} />

                <Search value={searchTerm} onSubmit={(value) => {
                    setSearchTerm(value)
                }} />
                <button className={css.resetButton} onClick={() => { setSearchTerm(initialValue) }}>reset</button>
                <button className={css.settingButton} onClick={onPageSizeHandling} style={{ fontWeight: 'bold' }}><SettingOutlined style={{ margin: '-7px' }} /></button>


                <span>  users per page: {pageSize}</span>
                <p style={{ fontStyle: 'italic' }}>  Total number of users found: {totalUsersCount}</p>

                <PageNumberSetting value={pageSize}
                    pagesInput={pagesInput}
                    settings={setPageInput}
                    onSubmit={(value) => { setPageSize(value) }}
                />

                <UsersList term={searchTerm}
                    selectedUser={selectedUser}
                    onUserSelected={setSelectedUser}
                    per_page={pageSize}
                    page={currentPage}
                    usersCount={setTotalUsersCount}
                />
            </div>
            <div className={css.details}>
                <UserDetails user={selectedUser} />
            </div>

        </div>
    </div>
}