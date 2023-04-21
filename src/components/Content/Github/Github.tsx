import { useEffect, useState } from 'react'
import css from './Github.module.css'
import axios from 'axios'

type SearchUserDataType = {
    login: string
    id: number
}

type SearchResultType = {
    items: SearchUserDataType[]
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


export const Github = () => {

    const [selectedUser, setSelectedUser] = useState<SearchUserDataType | null>(null)
    const [users, setUsers] = useState<SearchUserDataType[]>([])
    const [userDetails, setUserDetails] = useState<null | UserType>(null)
    const [tepmSearch, setTempSearch] = useState<string>('')
    const [searchTerm, setSearchTerm] = useState('polyakog')

    useEffect(() => {
        console.log('SYNC TAB TITLE')
        if (selectedUser) {
            document.title = selectedUser.login
        }

    }, [selectedUser])

    useEffect(() => {
        console.log('SYNC USERS', searchTerm)
        axios
            .get<SearchResultType>(`https://api.github.com/search/users?q=${searchTerm}`)
            .then(res => {
                setUsers(res.data.items)
            })

    }, [searchTerm])

    useEffect(() => {
        console.log('SYNC USER DATAILS')
        if (!!selectedUser) {
            axios
                .get<UserType>(`https://api.github.com/users/${selectedUser.login}`)
                .then(res => {
                    setUserDetails(res.data)
                })
        }


    }, [selectedUser])


    return <div className={css.container}>
        <h2> Github</h2>
        <img src="https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/github-512.png" alt='' />
        <div className={css.wrapper}>
            <div className={css.sidebar}>
                <div>
                    <input placeholder='search'
                        value={tepmSearch}
                        onChange={(e) => { setTempSearch(e.currentTarget.value) }} />
                    <button onClick={() => {
                        if (tepmSearch !== '') setSearchTerm(tepmSearch)

                    }}>find</button>
                </div>
                <ul>
                    {users
                        .map(u => <li key={u.id} className={selectedUser === u ? css.selected : ''} onClick={() => {
                            setSelectedUser(u)

                        }}>
                            {u.login}
                        </li>)
                    }
                </ul>
            </div>
            <div className={css.details}>


                {userDetails && <div>
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

        </div>




    </div>

}