# Card Components Refactoring

## 📋 Summary

Refactored artist-specific card components into generic, reusable components to eliminate code duplication and improve maintainability.

## 🔄 Changes Made

### New Generic Components

All located in `src/features/shared/components/`:

#### 1. **MediaCard**

Generic card for media content (playlists, albums, tracks)

- **Replaces**: `FeaturingCard`, `DiscoveredOnCard`
- **Props**:
  - `title` - media title
  - `subtitle` - description/metadata
  - `imageSources` - responsive image sources
  - `href` - link destination
  - `imageShape` - "square" (default) or "circular"

#### 2. **AlbumCard**

Card with album-specific metadata

- **Replaces**: `DiscographyCard`
- **Props**:
  - `name` - album name
  - `coverArtSources` - responsive album cover sources
  - `releaseYear` - release year (optional)
  - `albumType` - album type: "album", "single", etc. (optional)
  - `href` - link destination

#### 3. **CircularArtistCard**

Artist card with circular image

- **Replaces**: `ArtistCard`
- **Props**:
  - `name` - artist name
  - `role` - "Artist", "Producer", etc.
  - `imageSources` - responsive artist image sources
  - `href` - link destination

---

## 📂 Files Updated

### Artist Components

- `featuring.tsx` → uses `MediaCard`
- `artist-discovered-on.tsx` → uses `MediaCard`
- `artist-playlist.tsx` → uses `MediaCard`
- `discography.tsx` → uses `AlbumCard`
- `appears-on.tsx` → uses `AlbumCard`
- `related-artist.tsx` → uses `CircularArtistCard`

### Deleted Files

- ❌ `featuring-card.tsx` (100% duplicate of discovered-on-card)
- ❌ `discovered-on-card.tsx` (100% duplicate of featuring-card)
- ❌ `discography-card.tsx` (replaced by AlbumCard)
- ❌ `artist-card.tsx` (replaced by CircularArtistCard)

---

## ✅ Benefits

### Before Refactoring

```
❌ Tight coupling: FeaturingCard, DiscoveredOnCard (identical code!)
❌ Confusing names: DiscographyCard used for albums
❌ Not reusable: Cards tied to specific sections
❌ Code duplication: 4 card files with similar logic
```

### After Refactoring

```
✅ Decoupled: Generic components in shared/
✅ Clear naming: MediaCard, AlbumCard, CircularArtistCard
✅ Reusable: Can be used in any feature
✅ DRY: Single source of truth for each card type
```

---

## 🎯 Usage Examples

### MediaCard

```tsx
import { MediaCard } from "@/features/shared/components/media-card";

<MediaCard
  title="Chill Vibes"
  subtitle="Perfect for relaxing"
  imageSources={[{ url: "...", width: 300 }]}
  href="/playlist/123"
/>;
```

### AlbumCard

```tsx
import { AlbumCard } from "@/features/shared/components/album-card";

<AlbumCard
  name="Dark Side of the Moon"
  coverArtSources={[{ url: "...", width: 640 }]}
  releaseYear={1973}
  albumType="album"
  href="/album/456"
/>;
```

### CircularArtistCard

```tsx
import { CircularArtistCard } from "@/features/shared/components/circular-artist-card";

<CircularArtistCard
  name="Pink Floyd"
  role="Artist"
  imageSources={[{ url: "...", width: 300 }]}
  href="/artist/789"
/>;
```

---

## 🔍 Migration Guide

If you need to use these cards in other features:

1. Import from shared components:

```tsx
import { MediaCard, AlbumCard, CircularArtistCard } from "@/features/shared/components";
```

2. Update prop names:
   - `name` → `title` (for MediaCard)
   - `description` → `subtitle` (for MediaCard)
   - `coverArtSources` → `imageSources` (for MediaCard)
   - `type` → `albumType` (for AlbumCard)

3. All cards now support:
   - `href` prop for navigation
   - `className` for custom styling
   - Consistent play button behavior
