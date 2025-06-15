---
title: "Our Team"
url: "/team/"
weight: 3
---
## Meet Our A-Team

{{ range .Site.Data.team }}
### {{ .name }}
- **Role**: {{ .role }}
- **Description**: {{ .description }}
{{ end }}
