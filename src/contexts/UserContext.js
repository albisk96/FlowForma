import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios';
import moment from 'moment';

export const UserContext = createContext()

const UserContextProvider = props => {

    const [name, setName] = useState([]);
    const [tech, setTech] = useState([]);
    const [date, setDate] = useState([]);
    const [matrix, setMatrix] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const toggleTheme = () => (
      matrix ? 
        setMatrix(false) :
        setMatrix(true)
    )

    const api = axios.create({
      baseURL: `https://78.63.13.74:3006/FlowFormaAPI`
    })

    const GetName = () => {
        api.get('/names').then( result => {
            const names = result.data;
            setName(result.data)
            const year = names.map( name => {
                return api.get(`/getDate/${name}`).then( res => res.data)
            })
            Promise.all(year).then(data => {
                setDate(data);
            })
        })
    }

    useEffect(() => {
      const fetchData = async() => {
          setIsLoading(true);
          try {
              const result = await api.get('/tech')
              setTech(result.data)
              await GetName();
          } catch (error){
              setIsError(true);
          }
          setIsLoading(false);
      } 
      fetchData();
    }, []);

    let age = []
    date.map(x => 
      x.Death ?
        age.push(moment(`${x.Death}`).diff(moment(`${x.Birth}`), 'years')) : 
        age.push(moment(moment()).diff(moment(`${x.Birth}`), 'years'))
    )

    var len = name.length;
    var data = []
    for (var x = 0; x < len; x++) {
        var element = {
          "name" : name[x],
          "tech" : tech[x],
          "year": age[x]
        };
        data.push(element);
    }
    JSON.stringify(data);
    

  return (
    <UserContext.Provider
      value={{
        toggleTheme,
        data,
        isLoading,
        date,
        matrix
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContextProvider