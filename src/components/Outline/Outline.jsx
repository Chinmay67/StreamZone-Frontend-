import { Box ,Stack} from '@mui/material'
// import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
// import Main from '../VideoDisplay/Main'

function Outline() {
    return (
        <Box>
            <Stack direction="row" spacing={2} justifyContent="space-between">
                
                <Sidebar/>
                
            </Stack>
        </Box>
    )
}

export default Outline
