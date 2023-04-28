import React, { useState } from 'react'
import axios from 'axios'
import { Box, Button, ButtonGroup, Chip, Typography } from '@mui/material'
import UploadIcon from '@mui/icons-material/Upload'
import SearchIcon from '@mui/icons-material/Search'

import { styled } from '@mui/material/styles'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import FormRekvizity from './FomRekvizity'

const CustomWidthTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 500,
  },
});

const NoMaxWidthTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 'none',
  },
});

const longText = `
Карточка Компании - текстовый документ со всеми необходимыми реквизитами: Полное наименование организации, Сокращенное наименование организации, Юридический адрес, Фактический адрес, ИНН, КПП, ОГРН, ОКПО, ОКТМО, ОКОПФ, ОКФС, ОКАТО, ОКВЭД, Расчетный счет, Банк, БИК, Кор.счет, ФИО Генерального директора.
`




const FormUr = () => {
  const style1 = {
    border: '1px solid #7e7e7e',
    padding: '.5rem 1rem',
    borderRadius: '5px',
    cursor: 'pointer'
  }
  const [file, setFile] = useState()
  const [itog, setItog] = useState(null)
  const [rekvizity, setRekvizity] = useState(false)

  const handleChange = event => {
    setFile(event.target.files[0])
  }

  const handleSubmit = event => {
    event.preventDefault()
    if(!file) return

    const url = 'https://stonelikenew.ru/upload-info'
    const formData = new FormData()
    formData.append('file', file)
    formData.append('fileName', file.name)
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    }
    axios.post(url, formData, config).then(response => {
      setItog(response.data?.mes)
      setFile(null)
      console.log(response.data)
    })

  }


  return (
    <div className="form_ur">
      <form onSubmit={handleSubmit} className="ur_form">

        {!rekvizity && <Tooltip  title={longText}>
          <Typography 
            variant="h5" 
            sx={{
              marginBottom: 2,
              marginTop: 1
            }} 
            className="ur_form_title">
              <UploadIcon sx={{fontSize: '32px'}} /> &nbsp; Загрузите Карточку Компании
          </Typography>
        </Tooltip >}
        
        <ButtonGroup 
          variant="contained"
          aria-label="outlined primary button group">
          <Button 
            disabled={rekvizity ? true : false}
            component="label" 
            startIcon={<SearchIcon />}>
              {file ? file.name : 'ВЫБЕРИТЕ ФАЙЛ'}
              <input id="the_file" style={{visibility:'hidden', display: 'none'}} type="file" onChange={handleChange} />
          </Button>
          <Button  type="submit" 
            disabled={file ? false : true}>
              ЗАГРУЗИТЬ
          </Button>
        </ButtonGroup>
      </form>

      <Box sx={{
        textAlign: 'center',
        paddingBottom: '1rem'
      }}>
        <Typography variant="subtitle1"
          sx={{marginBottom: 2}}
          onClick={()=> setItog(null)}>{itog}</Typography>
        <Chip label={rekvizity ? "загрузить карточку компании" : "ввести реквизиты самостоятельно"} 
          sx={{cursor: 'pointer'}}
          onClick={()=> setRekvizity(prev => !prev)} />
      </Box>

      {rekvizity && <FormRekvizity />}
    </div>
  )
}

export default FormUr