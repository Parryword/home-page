"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputBase,
  InputLabel,
  Link as MuiLink,
  MenuItem,
  Select,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";

const providers = [
  { name: "Google", key: "google", url: "https://www.google.com/search?q=" },
  { name: "Bing", key: "bing", url: "https://www.bing.com/search?q=" },
  { name: "DuckDuckGo", key: "duckduckgo", url: "https://duckduckgo.com/?q=" },
  { name: "Yandex", key: "yandex", url: "https://yandex.com/search/?text=" },
  { name: "Wikipedia", key: "wikipedia", url: "https://en.wikipedia.org/wiki/Special:Search?search=" },
  { name: "Baidu Baike", key: "baidubaike", url: "https://baike.baidu.com/search?word=" },
];

const formSx = {
  display: "flex",
  alignItems: "stretch",
  bgcolor: "background.paper",
  border: 1,
  borderColor: "divider",
  borderRadius: 1,
  boxShadow: 1,
  "&:focus-within": {
    borderColor: "primary.main",
    boxShadow: "0 0 0 .25rem rgba(13, 110, 253, .25)",
  },
};

const selectSx = {
  height: "100%",
  borderRadius: 0,
  "& .MuiOutlinedInput-notchedOutline": { border: 0 },
  "& fieldset": { border: 0 },
  "& .MuiSelect-select": { borderRight: 1, borderColor: "divider" },
};

const theme = createTheme({
  palette: {
    primary: { main: "#0d6efd" },
    background: { default: "#f8f9fa", paper: "#ffffff" },
    text: { primary: "#212529", secondary: "#6c757d" },
  },
  typography: {
    fontFamily: "var(--font-geist-sans), sans-serif",
  },
  shape: { borderRadius: 6 },
});

export default function Home() {
  const [query, setQuery] = useState("");
  const [providerKey, setProviderKey] = useState("google");
  const provider = providers.find(({ key }) => key === providerKey) ?? providers[0];

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedQuery = query.trim();
    if (trimmedQuery) window.location.href = `${provider.url}${encodeURIComponent(trimmedQuery)}`;
  }

  function openRandomWikipedia() {
    window.open("https://en.wikipedia.org/wiki/Special:Random", "_blank", "noopener,noreferrer");
  }

  return (
    <ThemeProvider theme={theme}>
      <Box component="main" sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", bgcolor: "background.default", px: { xs: 2.5, sm: 5 }, py: 3.75 }}>
        <Box component="header" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <MuiLink component={Link} href="/" aria-label="Nook home" underline="none" color="text.primary" sx={{ fontSize: 25, fontWeight: 650, letterSpacing: "-.08em" }}>
            nook<span style={{ color: theme.palette.primary.main }}>.</span>
          </MuiLink>
          <Typography variant="caption" color="text.secondary" sx={{ letterSpacing: ".04em", display: { xs: "none", sm: "block" } }}>
            A quiet place to begin
          </Typography>
        </Box>

        <Container maxWidth="md" component="section" aria-labelledby="welcome-heading" sx={{ my: "auto", py: { xs: 7, sm: 12.5 } }}>
          <Typography variant="overline" color="primary" sx={{ fontWeight: 700, letterSpacing: ".16em" }}>
            Good morning
          </Typography>
          <Typography id="welcome-heading" component="h1" sx={{ maxWidth: 600, mt: 1, fontSize: { xs: 40, sm: 68 }, fontWeight: 450, letterSpacing: "-.065em", lineHeight: .98 }}>
            What are you looking for?
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 2.25, mb: 4.5, fontSize: 16 }}>
            Search the web, your way.
          </Typography>

          <Box component="form" onSubmit={submitSearch} sx={formSx}>
            <FormControl sx={{ minWidth: { xs: 118, sm: 150 } }}>
              <InputLabel id="provider-label">Engine</InputLabel>
              <Select labelId="provider-label" value={providerKey} label="Engine" onChange={(event) => setProviderKey(event.target.value)} sx={selectSx}>
                {providers.map(({ key, name }) => <MenuItem value={key} key={key}>{name}</MenuItem>)}
              </Select>
            </FormControl>
            <InputBase value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search with ${provider.name}`} inputProps={{ "aria-label": `Search with ${provider.name}`, autoFocus: true }} sx={{ flex: 1, minWidth: 0, px: 2, fontSize: 16 }} />
            <Button type="submit" variant="contained" disableElevation sx={{ alignSelf: "center", mr: 1, px: 2.25, whiteSpace: "nowrap" }}>Search</Button>
          </Box>

          <Button variant="text" color="inherit" onClick={openRandomWikipedia} sx={{ display: "block", mx: "auto", mt: 6.75, color: "text.secondary", textTransform: "none", borderBottom: 1, borderColor: "divider", borderRadius: 0 }}>
            <span aria-hidden="true" style={{ color: theme.palette.primary.main, marginRight: 5 }}>✦</span> Take me somewhere interesting
          </Button>
        </Container>

        <Box component="footer" sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: { xs: "flex-start", sm: "center" }, gap: 1.5, borderTop: 1, borderColor: "divider", pt: 2 }}>
          <Typography variant="caption" color="text.secondary" sx={{ letterSpacing: ".04em" }}>Built for small questions and big rabbit holes.</Typography>
          <Typography variant="caption" color="text.secondary" sx={{ letterSpacing: ".04em", alignSelf: { xs: "flex-end", sm: "auto" } }}>
            <Box component="kbd" sx={{ border: 1, borderColor: "divider", borderRadius: .5, px: .6, py: .2, mr: .4 }}>⌘</Box>
            <Box component="kbd" sx={{ border: 1, borderColor: "divider", borderRadius: .5, px: .6, py: .2, mr: .5 }}>K</Box>
            to focus search
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
