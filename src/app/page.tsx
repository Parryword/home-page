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
      <Container maxWidth="sm">
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
            nook.
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 4 }}>
            A quiet place to begin.
          </Typography>

          <Box component="form" onSubmit={submitSearch}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                p: 0.75,
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: "#dfe3e8",
                borderRadius: 2,
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
                sx={{ px: 1.5, py: 0.75, fontSize: "1rem" }}
              />
              
              <Button
                type="submit"
                variant="contained"
                disableElevation
                sx={{ minWidth: 0, px: 2, py: 1.1, borderRadius: 1.5 }}
              >
                Go
              </Button>
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
