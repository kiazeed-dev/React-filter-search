import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import Data from './data/MOCK_DATA.json'

const cards = Data;
const country = [...new Set(cards.map((data) => data.country))]
const gender = [...new Set(cards.map((data) => data.gender))]

const theme = createTheme();

export default function App() {
  const [genderAlignment, setGenderAlignment] = React.useState("");

  const handleGenderChange = (event, newAlignment) => {
    setQuery("");
    setGenderAlignment(newAlignment);
  };

  const [countryAlignment, setcountryAlignment] = React.useState("");

  const handlecountryChange = (event, newAlignment) => {
    setQuery("");
    setcountryAlignment(newAlignment);
  };

  const [query, setQuery] = React.useState("");

  const searchInput = (e) => {
    setcountryAlignment("");
    setGenderAlignment("");
    setQuery(e.target.value) 
  }

  const clearButton = () => {
    setQuery("");
    setcountryAlignment("");
    setGenderAlignment("");
  }

  const Filter = ["first_name", "last_name"];
  const searchHandle = [
    cards.filter((item) => Filter.some(key => item[key].toLowerCase().includes(query)))
    .filter((item) => item.gender.includes(genderAlignment))
    .filter((item) => item.country.includes(countryAlignment))
  ]

  const CardHandler = () => {
    return (
      searchHandle[0].map((card) => (
          <Grid item key={card.id} xs={12} sm={6} md={4}>
            <Card
              sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <CardMedia
                component="img"
                height="200"
                width="100"
                image={card.image}
              />
              <CardContent sx={{ flexGrow: 1 }} align="center"  >
                <Typography gutterBottom color="text.secondary">
                  {card.first_name + " " + card.last_name}
                </Typography>
                <Typography >{card.gender}</Typography>
                <Typography>{card.email}</Typography>
                <Typography>{card.country}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <AccountBoxIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Test
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Filter
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <ToggleButtonGroup
                color="primary"
                value={genderAlignment}
                exclusive
                onChange={handleGenderChange}
                aria-label="Platform"
              >
                {gender.map((elm, index) =>
                  <ToggleButton key={index} value={elm}>{elm}</ToggleButton>
                )}
              </ToggleButtonGroup>
            </Stack>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <ToggleButtonGroup
                color="primary"
                value={countryAlignment}
                exclusive
                onChange={handlecountryChange}
                aria-label="Platform"
              >
                {country.map((elm, index) =>
                  <ToggleButton key={index} value={elm}>{elm}</ToggleButton>
                )}
              </ToggleButtonGroup>
            </Stack>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <TextField id="outlined-basic" label="Search" variant="outlined" value={query} onChange={searchInput} />
              <Button variant="outlined" onClick={clearButton}>Clear</Button>
            </Stack>
          </Container>
        </Box>
        {/* End hero unit */}
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            <CardHandler></CardHandler>
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}