import axios from 'axios';


axios.defaults.baseURL = "https://tasklist-vanna.herokuapp.com/api/tasklist"

export default class apiService{
    
    getAllTask(){
        return axios.get('/')
    }

    // getPost(number){
    //     return axios.get(`/posts/${number}`)
    // }

    writeTask(post){
        return axios.post('/', post)
    }

    deleteTask(id){
        return axios.delete(`/${id}`)
    }
}