import { Button, ButtonGroup, TextField } from "@mui/material"
import { useState } from "react"
import FormFiz from "./components/FormFiz"
import FormUr from "./components/FormUr"
import "./mystyles.css"

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';



function App() {
  const [active, setActive] = useState(true)

  return (
    <div className="formWrapper">
      <ButtonGroup fullWidth variant="contained" aria-label="outlined primary button group">
        <Button
          variant={!active ? 'outlined' : 'contained'}
          onClick={()=> setActive(true)}
          sx={{
            // backgroundColor: '#0063cc',
          }}>Физ. лицо</Button>
        <Button 
          onClick={()=> setActive(false)}
          variant={active ? 'outlined' : 'contained'}>Юр. лицо</Button>
      </ButtonGroup>

      {
      active ? 
      <FormFiz /> :
      <FormUr />
      }
    </div>
  )
}

export default App
