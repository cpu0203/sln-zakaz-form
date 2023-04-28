import { Box, Button, SnackbarContent, TextField, Typography } from '@mui/material'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Validate, ValidationGroup } from 'mui-validate'

const inputStyle = {
  marginBottom: '1rem'
}




const FormFiz = () => {
  const [postAnswer, setPostAnswer] = useState(null)
  const [myErMessage, setMyErMessage] = useState(null)
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  const schema = yup.object().shape({
    userName: yup.string().required(),
    userMail: yup.string().email(),
    userPhone: yup.string()
    // userPhone: yup.string().matches(phoneRegExp, 'Неверно введен номер')
  })

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })
  
  const onSubmit = data => {
    if(!data.userPhone && !data.userMail){
      setMyErMessage('Введите E-mail или Номер телефона')
      return
    }
    if(!data.userPhone){
      myErMessage && setMyErMessage(null)
    }
    if(!data.userMail){
      let k = data.userPhone.match(phoneRegExp)
      if(!k){
        setMyErMessage('Номер введен некорректно')
        return
      }
      myErMessage && setMyErMessage(null)
      // console.log(data)
    }
    
    // if(data.userPhone && data.userMail) console.log(data)

    // console.log(data, 'otpravlyaem')
    // return

    const bodyTwo = new URLSearchParams(data)

    axios.post('https://stonelikenew.ru/upload-info', bodyTwo).
    then(response => {
      setPostAnswer(response.data)
      reset()
    })
  }

  const writeActionHanle = () => {
    const link = document.createElement("a")
    link.href = 'https://api.whatsapp.com/send?phone=+79019064885&text=Здравствуйте. Меня интересует ваш товар / услуга'
    link.click()
  }

  const writeAction = (
    <Button color="warning" size="small" 
      onClick={writeActionHanle}
      startIcon={<MailOutlineIcon />}>
        What'sUp
    </Button>
  )




  if(!postAnswer) return (
    <ValidationGroup>
      <form onSubmit={handleSubmit(onSubmit)}>

        <input type="hidden" 
          {...register("status_form")} 
          value="1" />

        <Typography variant="subtitle1" className="input_error">{errors.userName?.message ? 'Введите корректное имя' : ''}</Typography>
        <TextField className="inputField"
          {...register("userName")} 
          sx={inputStyle} fullWidth id="outlined-basic" label="ФИО" variant="outlined" />

        <Typography variant="subtitle1" className="input_error">{errors.userMail ? 'E-mail введен неверно' : ''}</Typography>
        <TextField className="inputField"
          {...register("userMail")} 
          sx={inputStyle}  fullWidth id="outlined-basic" label="E-mail" variant="outlined" />

        <Typography variant="subtitle1" className="input_error">{myErMessage ? myErMessage : ''}</Typography>
        <TextField className="inputField"
          {...register("userPhone")} 
          sx={inputStyle}  fullWidth id="outlined-basic" label="Телефон" variant="outlined" />

        <Button type="submit" id="submit">Заказать</Button>
        {/* <Button onClick={()=> reset()}>reset</Button> */}
      </form>
      <Typography variant="caption" sx={{
        // paddingBottom: 2,
        marginBottom: 2,
        opacity: .8,
        display: 'inline-block'
      }}>* одно из полей ТЕЛЕФОН или E-MAIL может быть незаполнено</Typography>
      
      <SnackbarContent message="Написать нам" action={writeAction} sx={{opacity: '.8', maxWidth: '600px', margin: '0 auto'}} />
      <div style={{display:'block', height: '1rem'}}></div>
    </ValidationGroup>

  )

  return (
    <Box sx={{textAlign: 'center'}}>
      <Typography variant="h5" 
        sx={{padding: 3, cursor: 'pointer'}}
        onClick={()=> setPostAnswer(null)}>
        {postAnswer}
      </Typography>
    </Box>
  )
}

export default FormFiz