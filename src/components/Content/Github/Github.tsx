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
        <div>
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
    onUserSelected: (user:SearchUserDataType)=>void
    
}
export const UsersList = (props: UsersListPropType) => {
    const [users, setUsers] = useState<SearchUserDataType[]>([])

    useEffect(() => {
        console.log('SYNC USERS', props.term)
        axios
            .get<SearchResultType>(`https://api.github.com/search/users?q=${props.term}`)
            .then(res => {
                setUsers(res.data.items)
            })

    }, [props.term])

   return (
       <ul>
           {users
               .map(u => <li key={u.id} className={props.selectedUser === u ? css.selected : ''} onClick={() => {
                   props.onUserSelected(u)

               }}>
                   {u.login}
               </li>)
           }
       </ul>
   )

}


export const Github = () => {
    const initialValue = 'polyakog'
    const [selectedUser, setSelectedUser] = useState<SearchUserDataType | null>(null)

    const [userDetails, setUserDetails] = useState<null | UserType>(null)
    const [searchTerm, setSearchTerm] = useState(initialValue)

    useEffect(() => {
        console.log('SYNC TAB TITLE')
        if (selectedUser) {
            document.title = selectedUser.login
        }

    }, [selectedUser])

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
                <Search value={searchTerm} onSubmit={(value) => {
                    setSearchTerm(value)
                }} />
                <button className={css.resetButton} onClick={() => { setSearchTerm(initialValue) }}>reset</button>
                <UsersList term={searchTerm} selectedUser={selectedUser} onUserSelected={setSelectedUser} />
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