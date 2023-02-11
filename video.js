  const axios = require("axios")
  const { load } = require("cheerio");
  const regex = require("./utils");

  async function video(url) {
    return new Promise(async (resolve, reject) => {
      if (await regex(url) == false) {
        reject("Can't See Song ID");
      }
      axios({
        method: 'post',
        url: 'https://www.y2mate.com/mates/en68/analyze/ajax',
        headers: {
          accept: "*/*",
          "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          "accept-language": "en-US,en;q=0.9",
          "sec-ch-ua": "\"Not_A Brand\";v=\"99\", \"Google Chrome\";v=\"109\", \"Chromium\";v=\"109\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "document",
          "sec-fetch-mode": "navigate",
          "sec-fetch-site": "cross-site",
          "upgrade-insecure-requests": "1",
          "Referer": "https://www.y2mate.com/",
          "Referrer-Policy": "strict-origin-when-cross-origin",
          'content-type': "multipart/form-data"
        },
        data: {
          url: url,
          q_auto: 0,
          ajax: 2
        }
      }).then(async (res) => {
        const $ = load(res.data.result);
        const imageSrc = $('div[class="thumbnail cover"]').find('a > img').attr('src'),
          title = $('div[class="caption text-left"]').find('b').text(),
          size = $('div').find('#mp4 > table > tbody > tr > td:nth-child(2)').text(),
          type = $('div').find('#mp4 > table > tbody > tr > td:nth-child(3) > a').attr('data-ftype'),
          quality = $('div').find('#mp4 > table > tbody > tr > td:nth-child(3) > a').attr('data-fquality'),
          id = /var k__id = "(.*?)"/.exec(res.data.result)[1]
        await axios({
          method: 'post',
          url: 'https://www.y2mate.com/mates/en68/convert',
          headers: {
            accept: "*/*",
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-language": "en-US,en;q=0.9",
            "sec-ch-ua": "\"Not_A Brand\";v=\"99\", \"Google Chrome\";v=\"109\", \"Chromium\";v=\"109\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "cross-site",
            "upgrade-insecure-requests": "1",
            "Referer": "https://www.y2mate.com/",
            "Referrer-Policy": "strict-origin-when-cross-origin",
            'content-type': "multipart/form-data"
          },
          data: {
            type: 'youtube',
            v_id: await regex(url),
            _id: id,
            ajax: '1',
            token: '',
            ftype: type,
            fquality: quality
          }
        }).then(async function (body) {
          const $ = load(body.data.result);
          var urlDown = $('div[class="form-group has-success has-feedback"]').find('a').attr("href");
          resolve({
            title,
            size,
            type,
            quality,
            imageSrc,
            urlDown
          })
        })
      })
    })
  }

  module.exports = { video };
