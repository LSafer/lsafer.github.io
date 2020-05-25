---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
links:
  Cufy: https://cufy.org
  GitHub: https://github.com/lsafer
  Patreon: https://patreon.com/lsafer
  Discord: https://discord.gg/ASAGGy7
  Gitter: https://gitter.im/cufyorg/community
  Twitch: https://www.twitch.tv/lsaferse
---

{{ site.description }}

{% include_relative me.md %}

<br>

{% assign projects = site.projects | sort: 'index' %}
{% for project in projects%}

<a class="big_candy" href="{{project.href}}">{{project.title}}</a>
<div>
{% for link in project.links %}
<a class="small_candy" href="{{ link[1] }}">{{ link[0] }}</a>
{% endfor %}
</div>

---

{{ project.content }}
<br>
{% endfor %}