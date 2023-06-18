# api/models.py

from django.db import models
from django.contrib.auth.models import User


class Record(models.Model):
    record_id = models.AutoField(primary_key=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    content = models.JSONField(null=True)  # json object

    def __str__(self):
        return self.title


# json object structure

"""
{
    "2023-04-23": [
    {
      "publishedAt": "2023-04-23",
      "sourceName": "Google News",
      "title": "Mexican president tests positive for COVID-19 for third time - Reuters.com",
      "url": "https://consent.google.com/ml?continue=https://news.google.com/rss/articles/CBMiZ2h0dHBzOi8vd3d3LnJldXRlcnMuY29tL3dvcmxkL2FtZXJpY2FzL21leGljYW4tcHJlc2lkZW50LXRlc3RzLXBvc2l0aXZlLWNvdmlkLTE5LXRoaXJkLXRpbWUtMjAyMy0wNC0yMy_SAQA?oc%3D5&gl=FR&hl=en-US&cm=2&pc=n&src=1"
    },
    {
      "publishedAt": "2023-04-23",
      "sourceName": "The Guardian",
      "title": "Covid-era revival of interest in Welsh history prompts visitor surge",
      "url": "https://www.theguardian.com/uk-news/2023/apr/24/covid-era-revival-of-interest-in-welsh-history-prompts-visitor-surge"
    }
  ],
  "2023-04-24": [
    {
      "publishedAt": "2023-04-24",
      "sourceName": "Google News",
      "title": "Mexico president self-isolating after catching COVID-19, under ... - Reuters.com",
      "url": "https://consent.google.com/ml?continue=https://news.google.com/rss/articles/CBMiggFodHRwczovL3d3dy5yZXV0ZXJzLmNvbS93b3JsZC9hbWVyaWNhcy9tZXhpY28tcHJlc2lkZW50LXNlbGYtaXNvbGF0aW5nLWFmdGVyLWNhdGNoaW5nLWNvdmlkLTE5LXVuZGVyLW1lZGljYWwtdHJlYXRtZW50LTIwMjMtMDQtMjQv0gEA?oc%3D5&gl=FR&hl=en-US&cm=2&pc=n&src=1"
    },
    {
      "publishedAt": "2023-04-24",
      "sourceName": "NPR",
      "title": "Tracking health threats, one sewage sample at a time",
      "url": "https://www.npr.org/sections/health-shots/2023/04/24/1171177281/wastewater-surveillance-covid-tracking"
    },
    {
      "publishedAt": "2023-04-24",
      "sourceName": "Engadget",
      "title": "The UK will spend £100 million to develop its own 'sovereign' AI",
      "url": "https://www.engadget.com/the-uk-is-creating-a-100-million-ai-taskforce-143507868.html"
    },
    {
      "publishedAt": "2023-04-24",
      "sourceName": "Time",
      "title": "COVID-19 Nicknames Get a Makeover",
      "url": "https://time.com/6273991/covid-names-change-kraken-arcturus/"
    },
    {
      "publishedAt": "2023-04-24",
      "sourceName": "Engadget",
      "title": "Chromebooks' short lifespans are creating 'piles of electronic waste'",
      "url": "https://www.engadget.com/chromebooks-short-lifespans-are-creating-piles-of-electronic-waste-063314306.html"
    },
    {
      "publishedAt": "2023-04-24",
      "sourceName": "The Guardian",
      "title": "Vaccine uptake among children in England has fallen since start of pandemic",
      "url": "https://www.theguardian.com/society/2023/apr/24/vaccination-rates-fallen-children-england-ukhsa"
    }
}
"""
