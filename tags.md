---
layout: page
title: "Tags"
permalink: /tags/
---

<div class="tag-cloud">
  <div class="tags-row">
    {% assign all_tags = site.posts | map: "tags" | join: "," | split: "," | sort | uniq %}
    {% for tag in all_tags %}
    {% assign count = site.posts | where_exp: "post", "post.tags contains tag" | size %}
    <a href="#{{ tag | slugify }}" class="tag-star">{{ tag }} ({{ count }})</a>
    {% endfor %}
  </div>
</div>

{% for tag in all_tags %}
{% assign tagged = site.posts | where_exp: "post", "post.tags contains tag" %}
{% if tagged.size > 0 %}
<section id="{{ tag | slugify }}" style="margin-bottom:3rem">
  <h2 class="section-title">{{ tag }}<span class="section-title__count">{{ tagged.size }}</span></h2>
  <ul style="list-style:none;padding:0">
    {% for post in tagged %}
    <li style="display:flex;gap:1rem;align-items:baseline;padding:.5rem 0;border-bottom:1px solid rgba(155,188,15,0.1)">
      <time style="font-family:monospace;font-size:.7rem;color:#9bbc0f;min-width:80px" datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%b %-d, %Y" }}</time>
      <a href="{{ post.url | relative_url }}" style="font-family:monospace;font-size:.8rem;color:#9bbc0f" onmouseover="this.style.color='#9bbc0f'" onmouseout="this.style.color='#9bbc0f'">{{ post.title }}</a>
    </li>
    {% endfor %}
  </ul>
</section>
{% endif %}
{% endfor %}
