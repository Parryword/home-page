"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
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
  Typography,
} from "@mui/material";

const providers = [
  { name: "Google", key: "google", url: "https://www.google.com/search?q=" },
  { name: "Bing", key: "bing", url: "https://www.bing.com/search?q=" },
  { name: "DuckDuckGo", key: "duckduckgo", url: "https://duckduckgo.com/?q=" },
  { name: "Yandex", key: "yandex", url: "https://yandex.com/search/?text=" },
  { name: "Wikipedia", key: "wikipedia", url: "https://en.wikipedia.org/wiki/Special:Search?search=" },
  { name: "Baidu Baike", key: "baidubaike", url: "https://baike.baidu.com/search?word=" },
];

export default function Home() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [providerKey, setProviderKey] = useState("google");
  const provider = providers.find(({ key }) => key === providerKey) ?? providers[0];

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedQuery = query.trim();
    if (trimmedQuery) router.push(`${provider.url}${encodeURIComponent(trimmedQuery)}`);
  }

  function openRandomWikipedia() {
    window.open("https://en.wikipedia.org/wiki/Special:Random", "_blank", "noopener,noreferrer");
  }

  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f6f7f9",
        px: 2,
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ textAlign: "center" }}>
          <Typography
            component="h1"
            sx={{
              color: "#17202a",
              fontSize: { xs: "3rem", sm: "4.5rem" },
              fontWeight: 700,
              letterSpacing: "-0.06em",
              lineHeight: 1,
              mb: 1,
            }}
          >
            yren
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 4 }}>
            A quiet place to begin.
          </Typography>

          <Box component="form" onSubmit={submitSearch}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0,
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <FormControl
                size="small"
                sx={{
                  width: { xs: "100%", sm: 145 },
                  height: 64,
                  "& .MuiOutlinedInput-root": {
                    height: "100%",
                    borderRadius: { xs: 2, sm: "8px 0 0 8px" },
                    "& fieldset": { borderRight: { sm: 0 } },
                  },
                }}
              >
                <InputLabel id="search-engine-label">Engine</InputLabel>
                <Select
                  labelId="search-engine-label"
                  value={providerKey}
                  label="Engine"
                  onChange={(event) => setProviderKey(event.target.value)}
                  sx={{ height: "100%", bgcolor: "background.paper" }}
                >
                  {providers.map((option) => (
                    <MenuItem key={option.key} value={option.key}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  flex: 1,
                  width: { xs: "100%", sm: "auto" },
                  height: 64,
                  p: 0.75,
                  bgcolor: "background.paper",
                  border: "1px solid",
                  borderColor: "#dfe3e8",
                  borderRadius: { xs: 2, sm: "0 8px 8px 0" },
                  boxShadow: "0 8px 24px rgba(23, 32, 42, 0.06)",
                  transition: "border-color 160ms ease, box-shadow 160ms ease",
                  "&:focus-within": {
                    borderColor: "#5c6f82",
                    boxShadow: "0 10px 30px rgba(23, 32, 42, 0.1)",
                  },
                }}
              >
                <InputBase
                  autoFocus
                  fullWidth
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search the web"
                  inputProps={{ "aria-label": "Search the web" }}
                  sx={{ height: 48, px: 1.5, fontSize: "1rem" }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  disableElevation
                  sx={{ minWidth: 0, height: 48, px: 2, borderRadius: 1.5 }}
                >
                  Go
                </Button>
              </Box>
            </Box>
          </Box>

          <MuiLink
            component="button"
            type="button"
            onClick={openRandomWikipedia}
            underline="hover"
            sx={{ mt: 3, border: 0, bgcolor: "transparent", cursor: "pointer", color: "text.secondary" }}
          >
            Take me somewhere random
          </MuiLink>
        </Box>
      </Container>
    </Box>
  );
}
