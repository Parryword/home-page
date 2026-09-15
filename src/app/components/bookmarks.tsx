"use client";

import { useState } from "react";
import {
	Box,
	Link,
	Stack,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
} from "@mui/material";

type Bookmark = {
	name: string;
	url: string;
};

type BookmarkGroup = {
	name: string;
	accent: string;
	items: Bookmark[];
};

const bookmarkGroups: BookmarkGroup[] = [
	{
		name: "News",
		accent: "#d95d39",
		items: [
			{ name: "The Guardian", url: "https://www.theguardian.com" },
			{ name: "Hacker News", url: "https://news.ycombinator.com" },
			{ name: "NPR", url: "https://www.npr.org" },
		],
	},
	{
		name: "Development",
		accent: "#2d7f6e",
		items: [
			{ name: "GitHub", url: "https://github.com" },
			{ name: "MDN Web Docs", url: "https://developer.mozilla.org" },
			{ name: "Stack Overflow", url: "https://stackoverflow.com" },
		],
	},
	{
		name: "Forums",
		accent: "#6a5acd",
		items: [
			{ name: "Reddit", url: "https://www.reddit.com" },
			{ name: "Lobsters", url: "https://lobste.rs" },
			{ name: "Product Hunt", url: "https://www.producthunt.com" },
		],
	},
	{
		name: "Reference",
		accent: "#b07a32",
		items: [
			{ name: "Wikipedia", url: "https://wikipedia.org" },
			{ name: "Are.na", url: "https://www.are.na" },
			{ name: "Internet Archive", url: "https://archive.org" },
		],
	},
];

export default function Bookmarks() {
	const [view, setView] = useState<"grid" | "list">("grid");

	return (
		<Box component="section" aria-labelledby="bookmarks-heading" sx={{ width: "100%" }}>
			<Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
				<Box>
					<Typography id="bookmarks-heading" component="h2" variant="h5" sx={{ fontWeight: 700 }}>
						Your places
					</Typography>
					<Typography color="text.secondary" variant="body2">
						A small map of the web.
					</Typography>
				</Box>
				<ToggleButtonGroup
					exclusive
					size="small"
					value={view}
					onChange={(_, nextView: "grid" | "list" | null) => nextView && setView(nextView)}
					aria-label="Bookmark layout"
				>
					  <ToggleButton value="grid" aria-label="Grid view" sx={{ fontSize: "1rem" }}>▦</ToggleButton>
					  <ToggleButton value="list" aria-label="List view" sx={{ fontSize: "1rem" }}>☷</ToggleButton>
				</ToggleButtonGroup>
			</Box>

			<Stack spacing={4}>
				{bookmarkGroups.map((group) => (
					<Box key={group.name}>
						<Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
							<Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: group.accent }} />
							<Typography component="h3" variant="overline" sx={{ color: "text.secondary", fontWeight: 700, letterSpacing: "0.12em" }}>
								{group.name}
							</Typography>
						</Box>
						<Box sx={{ display: "grid", gridTemplateColumns: view === "grid" ? { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" } : "1fr", gap: 1.5 }}>
							{group.items.map((bookmark) => (
								<Link
									key={bookmark.name}
									href={bookmark.url}
									target="_blank"
									rel="noreferrer"
									underline="none"
									sx={{
										display: "flex",
										alignItems: "center",
										justifyContent: "space-between",
										gap: 2,
										minHeight: view === "grid" ? 92 : 64,
										px: 2,
										py: 1.25,
										border: "1px solid",
										borderColor: "#e5e8eb",
										borderRadius: 1.5,
										color: "text.primary",
										transition: "border-color 150ms ease, transform 150ms ease, box-shadow 150ms ease",
										"&:hover": { borderColor: group.accent, transform: "translateY(-2px)", boxShadow: "0 8px 20px rgba(23, 32, 42, 0.07)" },
									}}
								>
									<Box>
										<Typography sx={{ fontWeight: 650 }}>{bookmark.name}</Typography>
									</Box>
									<Typography aria-hidden="true" sx={{ color: group.accent, fontSize: "1.25rem" }}>↗</Typography>
								</Link>
							))}
						</Box>
					</Box>
				))}
			</Stack>
		</Box>
	);
}
