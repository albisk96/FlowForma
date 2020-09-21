import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios';
import moment from 'moment';

export const UserContext = createContext()

const UserContextProvider = props => {
    const [data, setData] = useState([]);
    const [matrix, setMatrix] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const toggleTheme = () => (
      matrix ? 
        setMatrix(false) :
        setMatrix(true)
    )

    const api = axios.create({
      baseURL: `http://78.63.13.74:3006/FlowFormaAPI`
    })

     const getYear = (name) => {
      const year = api.get(`/getDate/${name}`).then(res => {
        return res.data
      })
      return year;
     }

    useEffect(() => {
      const fetchData = async() => {
          setIsLoading(true);
          try {
              const techs = await api.get('/tech')
              const names = await api.get('/names')
              const dates = await Promise.all(names.data.map(name => getYear(name))).then(data => {
                return data
              })

              let age = []
              dates.map(x => 
                x.Death ?
                  age.push(moment(`${x.Death}`).diff(moment(`${x.Birth}`), 'years')) : 
                  age.push(moment(moment()).diff(moment(`${x.Birth}`), 'years'))
              )
              
              for (var x = 0; x < techs.data.length; x++) {
                  var element = {
                    "name" : names.data[x],
                    "tech" : techs.data[x],
                    "years": age[x]
                  };
                  data.push(element);
              }
              JSON.stringify(data);
              setData(data);
          } catch (error){
              setIsError(true);
          }
          setIsLoading(false);
      } 
      fetchData();
    }, []);
    

  return (
    <UserContext.Provider
      value={{
        toggleTheme,
        data,
        isLoading,
        matrix
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContextProvider