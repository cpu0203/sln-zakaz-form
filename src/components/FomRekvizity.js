import { Box, Button, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Validate, ValidationGroup } from 'mui-validate'

const inputStyle = {
  marginBottom: '1rem'
}




const FormRekvizity = () => {
  const [postAnswer, setPostAnswer] = useState(null)

  const schema = yup.object().shape({
    companyName: yup.string().required(),
    companyNick: yup.string().required(),
    companyAddressUr: yup.string().required(),
    companyAddressFact: yup.string().required(),
    companyInn: yup.string().required(),
    companyOgrn: yup.number().required(),
    companyOkpo: yup.number().required(),
    companyOktmo: yup.number().required(),
    companyOkopf: yup.number().required(),
    companyOkfc: yup.number().required(),
    companyOkato: yup.number().required(),
    companyOkved: yup.string().required(),
    companyRasScet: yup.number().required(),
    companyBank: yup.string().required(),
    companyBik: yup.number().required(),
    companyKorScet: yup.number().required(),
    companyGenDir: yup.string().required(),
  })

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })
  
  // const submitForm = e => {
  //   e.preventDefault()
  //   console.log('form')
  // }
  
  const onSubmit = data => {
    const bodyTwo = new URLSearchParams(data)

    axios.post('https://stonelikenew.ru/upload-info', bodyTwo).
    then(response => {
      setPostAnswer(response.data)
      reset()
    })
  }





  if(!postAnswer) return (
    <ValidationGroup>
      <form onSubmit={handleSubmit(onSubmit)}>

        <input type="hidden" 
          {...register("status_form")}
          value="2" />

        <Typography variant="subtitle1" className="input_error">{errors.companyName?.message ? 'Введите корректное наименование' : ''}</Typography>
        <TextField className="inputField"
          {...register("companyName")} 
          sx={inputStyle} fullWidth id="outlined-basic" label="Полное наименование организации" variant="outlined" />

        <Typography variant="subtitle1" className="input_error">{errors.companyNick?.message ? 'Введите корректное наименование' : ''}</Typography>
        <TextField className="inputField"
          {...register("companyNick")} 
          sx={inputStyle}  fullWidth id="outlined-basic" label="Сокращенное наименование организации" variant="outlined" />

        <Typography variant="subtitle1" className="input_error">{errors.companyAddressUr?.message ? 'Введите корректный адрес' : ''}</Typography>
        <TextField className="inputField"
          {...register("companyAddressUr")} 
          sx={inputStyle}  fullWidth id="outlined-basic" label="Юридический адрес" variant="outlined" />

        <Typography variant="subtitle1" className="input_error">{errors.companyAddressFact?.message ? 'Введите корректный адрес' : ''}</Typography>
        <TextField className="inputField"
          {...register("companyAddressFact")} 
          sx={inputStyle}  fullWidth id="outlined-basic" label="Фактический адрес" variant="outlined" />

        <Typography variant="subtitle1" className="input_error">{errors.companyInn?.message ? 'Номер введен неверно' : ''}</Typography>
        <TextField className="inputField"
          {...register("companyInn")} 
          sx={inputStyle}  fullWidth id="outlined-basic" label="ИНН / КПП" variant="outlined" />

        <Typography variant="subtitle1" className="input_error">{errors.companyOgrn?.message ? 'Номер введен неверно' : ''}</Typography>
        <TextField className="inputField"
          {...register("companyOgrn")} 
          sx={inputStyle}  fullWidth id="outlined-basic" label="ОГРН" variant="outlined" />

        <Typography variant="subtitle1" className="input_error">{errors.companyOkpo?.message ? 'Номер введен неверно' : ''}</Typography>
        <TextField className="inputField"
          {...register("companyOkpo")} 
          sx={inputStyle}  fullWidth id="outlined-basic" label="ОКПО" variant="outlined" />

        <Typography variant="subtitle1" className="input_error">{errors.companyOktmo?.message ? 'Номер введен неверно' : ''}</Typography>
        <TextField className="inputField"
          {...register("companyOktmo")} 
          sx={inputStyle}  fullWidth id="outlined-basic" label="ОКТМО" variant="outlined" />

        <Typography variant="subtitle1" className="input_error">{errors.companyOkopf?.message ? 'Номер введен неверно' : ''}</Typography>
        <TextField className="inputField"
          {...register("companyOkopf")} 
          sx={inputStyle}  fullWidth id="outlined-basic" label="ОКОПФ" variant="outlined" />

        <Typography variant="subtitle1" className="input_error">{errors.companyOkfc?.message ? 'Номер введен неверно' : ''}</Typography>
        <TextField className="inputField"
          {...register("companyOkfc")} 
          sx={inputStyle}  fullWidth id="outlined-basic" label="ОКФС" variant="outlined" />

        <Typography variant="subtitle1" className="input_error">{errors.companyOkato?.message ? 'Номер введен неверно' : ''}</Typography>
        <TextField className="inputField"
          {...register("companyOkato")} 
          sx={inputStyle}  fullWidth id="outlined-basic" label="ОКАТО" variant="outlined" />

        <Typography variant="subtitle1" className="input_error">{errors.companyOkved?.message ? 'Номер введен неверно' : ''}</Typography>
        <TextField className="inputField"
          {...register("companyOkved")} 
          sx={inputStyle}  fullWidth id="outlined-basic" label="ОКВЭД" variant="outlined" />

        <Typography variant="subtitle1" className="input_error">{errors.companyRasScet?.message ? 'Номер введен неверно' : ''}</Typography>
        <TextField className="inputField"
          {...register("companyRasScet")} 
          sx={inputStyle}  fullWidth id="outlined-basic" label="Расчетный счет" variant="outlined" />

        <Typography variant="subtitle1" className="input_error">{errors.companyBank?.message ? 'Введите название правильно' : ''}</Typography>
        <TextField className="inputField"
          {...register("companyBank")} 
          sx={inputStyle}  fullWidth id="outlined-basic" label="Банк" variant="outlined" />

        <Typography variant="subtitle1" className="input_error">{errors.companyBik?.message ? 'Номер введен неверно' : ''}</Typography>
        <TextField className="inputField"
          {...register("companyBik")} 
          sx={inputStyle}  fullWidth id="outlined-basic" label="БИК" variant="outlined" />

        <Typography variant="subtitle1" className="input_error">{errors.companyKorScet?.message ? 'Номер введен неверно' : ''}</Typography>
        <TextField className="inputField"
          {...register("companyKorScet")} 
          sx={inputStyle}  fullWidth id="outlined-basic" label="Кор.счет" variant="outlined" />

        <Typography variant="subtitle1" className="input_error">{errors.companyGenDir?.message ? 'Введите ФИО' : ''}</Typography>
        <TextField className="inputField"
          {...register("companyGenDir")} 
          sx={inputStyle}  fullWidth id="outlined-basic" label="ФИО Генерального директора" variant="outlined" />

        <Button type="submit" id="submit">Заказать</Button>
      </form>
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

export default FormRekvizity