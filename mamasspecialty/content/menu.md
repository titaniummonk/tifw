---
title: "Menu"
url: "/menu/"
weight: 2
---
## Delicious Homemade Food

{{ range .Site.Data.menu.food }}
- **{{ .name }}** ({{ .price }})
  - {{ .description }}
{{ end }}

## Specialty Crafted Coffee

{{ range .Site.Data.menu.coffee }}
- **{{ .name }}** ({{ .price }})
  - {{ .description }}
{{ end }}

## Still Delicious Non-Coffee

{{ range .Site.Data.menu.noncoffee }}
- **{{ .name }}** ({{ .price }})
  - {{ .description }}
{{ end }}
