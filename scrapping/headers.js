

const optionsInfo = {
    'method':'GET',
    "headers": {
    "accept": "application/json",
    "accept-language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
    "content-type": "application/json",
    "if-none-match": "W/\"133e5992cedf86f1e21469e80642755f\"",
    "sec-ch-ua": "\"Google Chrome\";v=\"89\", \"Chromium\";v=\"89\", \";Not A Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-requested-with": "XMLHttpRequest",
    "cookie": "first_time_visit=4DmxZFSNX7tH21wxktFxOJL%2Bl2hwKlxgpt6XYXtD%2B0%2FvH87Kok1PNtDy6nvw29dGh9FE49IuK1DRjegefDQ7NeyhslsiimSO1g%3D%3D--xpijhoGT63qR1WSA--SnGPtDqx5ZwX5xzTegv4yA%3D%3D; client_cache_key=N5zojlrGsy0w4%2FrrSxCRjhzFKP4sgrjnItdNe0T%2Bb%2FMX1plycQmjHA2IiPdm2fB7%2FXwt5hk7zZ4GVojReZpfusQKZalcXWyo6vJ9CRhPs58oLKzIe0VoxW3%2FYULdT2jVpdJKaIgFyjXi--%2FvM9ji60oAAEfwG0--Wqb4VDibYX%2BmjvpW4CdH6Q%3D%3D; eeny_meeny_test_cross_sell_above_fold_v1=asGiAZuCMAnQ3YcDk22yq3MvUDWGL5QAv6ctQk9u6Gy54uPzz%2FzIAkZ%2FLw9WWMLWCAmjMrfSWw%2FYYPw%2FfyEPbw%3D%3D; __asc=719de6d21785bcf2d7ff4d7ce61; __auc=719de6d21785bcf2d7ff4d7ce61; _ga=GA1.2.1851370327.1616448008; _gid=GA1.2.121216.1616448008; _fbp=fb.1.1616448007634.247864893; _hjTLDTest=1; _hjid=43c7367b-be30-4ac6-a9e1-cc0b348c046a; _hjFirstSeen=1; _hjAbsoluteSessionInProgress=0; _hp2_ses_props.3503103446=%7B%22r%22%3A%22https%3A%2F%2Fwww.google.com%2F%22%2C%22ts%22%3A1616448007579%2C%22d%22%3A%22www.vivino.com%22%2C%22h%22%3A%22%2FFR%2Ffr%22%7D; deal_merchant_context=sZwv--BWWB%2Fdtxj2OPWUlT--C1W4NNA%2BFx6QNQ8OUXGCtg%3D%3D; recently_viewed=lKLb9P2Z5z5%2FNc97JhrglCdAXFRCLnvkTZYmDUik94ZgMLTcpoGbEudYRveisCVuRz0eKQNu4qDQLVMa%2FSHuJZo5ZrZJT27oAeTrcWgBCruP8TFyL8RVDsong9GI7kh1qTJl%2BK475a844tYAfmbxVrfwQmvC6gGm7PrefjCZdW0VJsavLIbKRf2fLCwUA%2FQpg9bZ68YAmFuAXNdcOWWaveeDzgNadcXXNZctXWwvh0SarnmVroP0bP8Gfj%2F8ElPb90tOf6EAPvutCmwdzRyz7GC3TOHyoXLJpV%2B%2FAFNIyju0MKgim5W1NX%2FgyQWm%2FrmcetHGA6WUMnGeX7AbIJ3a7Ri4lotCXfhQHNk9lm%2BQ%2Fw8NBZNm8Wwf0m4kO%2F2ncaD2ogs2GkDjL%2FUHf78Mh45ZkN97GCHiwSukGgaQxgyd%2BmADujmk8YGHwOHpm90E--QnDoMPkEBMQDcYm3--y9kWLhmvlgXASJ568z6AWg%3D%3D; _ruby-web_session=RtfbzSez6M95YRpf8h3pAcpSOxYzlgjcCaraNWsJF6gjzWlNJsTfwLmmX68iAtJK59ByehIQrM8uz3mfegGTEForaSQbeNzTiALNVkDve8S%2Fu5SWfhPCA1mANqv%2Bd9LUGpmAq22N8JBF4eCA%2Fiw3m8x7NJ1jBK790AuZ2ED8v90zjftpg%2F55xPDgF1Dr1dNrB7B8IQJAEag2cjLK%2B2FiwVSBpLdGai1DIF%2BlYdk7t75FBBnw5TI%2BdJefnyiJdhE01u3d5%2FB7Jou0%2BeGEnF%2FW2h0C6zziGK7YCn2x7O6B7WlM73jGhE2x1DIfMYnn22lObat2DUmi0u6mIj0Ek5VOZbT1wDBQmdcSSL7o1AQcuz8D8Y5zdsMeVqK7uX4U4gFlW3ZpWrVPQWATLiwlquQZAkHfMyspfB9iR0z%2BEYK583EbeIFnK7fvuAAG70NuIjfeVqt%2BWeqNfKL4rq%2ByWLv3DyOoZwfjjIRQ82p1K1f%2FmRCNOR%2FBVwqr4ordPPn0vNL2fO0PxDVPcdsPBCI%2FIdfPk%2FCb70QBSibcynbIldhKiP52--YACFbFWcbXrTWqQO--s0U9xTU3oybD94H9xhNzMw%3D%3D; _hp2_id.3503103446=%7B%22userId%22%3A%22456891587555083%22%2C%22pageviewId%22%3A%222456489394447825%22%2C%22sessionId%22%3A%222987025413886935%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; _gat_vivinoTracker=1; _hjIncludedInPageviewSample=1; _hjIncludedInSessionSample=1"
    },
    'url':'https://www.vivino.com/api/wines/1103252/reviews?per_page=1&page=1'
}


const optionsTaste = {
    'method':'GET',
    "headers": {
    "accept": "application/json",
    "accept-language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
    "content-type": "application/json",
    "sec-ch-ua": "\"Google Chrome\";v=\"89\", \"Chromium\";v=\"89\", \";Not A Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-requested-with": "XMLHttpRequest",
    "cookie": "first_time_visit=4DmxZFSNX7tH21wxktFxOJL%2Bl2hwKlxgpt6XYXtD%2B0%2FvH87Kok1PNtDy6nvw29dGh9FE49IuK1DRjegefDQ7NeyhslsiimSO1g%3D%3D--xpijhoGT63qR1WSA--SnGPtDqx5ZwX5xzTegv4yA%3D%3D; client_cache_key=N5zojlrGsy0w4%2FrrSxCRjhzFKP4sgrjnItdNe0T%2Bb%2FMX1plycQmjHA2IiPdm2fB7%2FXwt5hk7zZ4GVojReZpfusQKZalcXWyo6vJ9CRhPs58oLKzIe0VoxW3%2FYULdT2jVpdJKaIgFyjXi--%2FvM9ji60oAAEfwG0--Wqb4VDibYX%2BmjvpW4CdH6Q%3D%3D; eeny_meeny_test_cross_sell_above_fold_v1=asGiAZuCMAnQ3YcDk22yq3MvUDWGL5QAv6ctQk9u6Gy54uPzz%2FzIAkZ%2FLw9WWMLWCAmjMrfSWw%2FYYPw%2FfyEPbw%3D%3D; __asc=719de6d21785bcf2d7ff4d7ce61; __auc=719de6d21785bcf2d7ff4d7ce61; _ga=GA1.2.1851370327.1616448008; _gid=GA1.2.121216.1616448008; _fbp=fb.1.1616448007634.247864893; _hjTLDTest=1; _hjid=43c7367b-be30-4ac6-a9e1-cc0b348c046a; _hjFirstSeen=1; _hjIncludedInPageviewSample=1; _hjAbsoluteSessionInProgress=0; _hjIncludedInSessionSample=1; _hp2_ses_props.3503103446=%7B%22r%22%3A%22https%3A%2F%2Fwww.google.com%2F%22%2C%22ts%22%3A1616448007579%2C%22d%22%3A%22www.vivino.com%22%2C%22h%22%3A%22%2FFR%2Ffr%22%7D; deal_merchant_context=sZwv--BWWB%2Fdtxj2OPWUlT--C1W4NNA%2BFx6QNQ8OUXGCtg%3D%3D; recently_viewed=lKLb9P2Z5z5%2FNc97JhrglCdAXFRCLnvkTZYmDUik94ZgMLTcpoGbEudYRveisCVuRz0eKQNu4qDQLVMa%2FSHuJZo5ZrZJT27oAeTrcWgBCruP8TFyL8RVDsong9GI7kh1qTJl%2BK475a844tYAfmbxVrfwQmvC6gGm7PrefjCZdW0VJsavLIbKRf2fLCwUA%2FQpg9bZ68YAmFuAXNdcOWWaveeDzgNadcXXNZctXWwvh0SarnmVroP0bP8Gfj%2F8ElPb90tOf6EAPvutCmwdzRyz7GC3TOHyoXLJpV%2B%2FAFNIyju0MKgim5W1NX%2FgyQWm%2FrmcetHGA6WUMnGeX7AbIJ3a7Ri4lotCXfhQHNk9lm%2BQ%2Fw8NBZNm8Wwf0m4kO%2F2ncaD2ogs2GkDjL%2FUHf78Mh45ZkN97GCHiwSukGgaQxgyd%2BmADujmk8YGHwOHpm90E--QnDoMPkEBMQDcYm3--y9kWLhmvlgXASJ568z6AWg%3D%3D; _hp2_id.3503103446=%7B%22userId%22%3A%22456891587555083%22%2C%22pageviewId%22%3A%226569513481550050%22%2C%22sessionId%22%3A%222987025413886935%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; _gat_vivinoTracker=1; _ruby-web_session=F4MJkBXWksJK%2FH9mhHDqAXdaFG6PmlQj%2BkQMVmP81G94MNNcbxPNESC%2BBpGcs%2F1IZgowJNKZzejJDXYsTJlSl8c8k5gAaV8xIZ392RlT80RLuvzdPnY%2FyqdXnnYUPKPL6oc8tF9GAw1tjUujvE7onI6Bc2p6QZmGtJRlRh%2B%2F7DrtwpeAM44LMQIlyQU6EIUv1BOgU5Qtk4mpNl2EmbVdEb%2B9fPrrLhqki2CQiv1Z44Ru2FFdQqIH2K2fMA6%2FLU6HBjVcVopnZzoAhQJ0VGS0GbVIA12c0kmHdXAVotHUWqgaLs62r2svgzeTWQ3FCyawXyNabyfuH3uEhMUZP8R6XyOO8ZdMvlw21eMI3%2B%2FutV9AGuSZfdjQ83y9Sm3P9Flp4LidOCntkEs3ezm%2BhlXh1jvrYnYEvf43YBIDLzCcbif0cS6iBr0GZrh7wQaYfEdSVUSER6CxTYrhu6BUg593zTsO4AsYvzi%2BHyUiuk2L%2BWx%2Fr61cRL9bISRno0%2FmmIC89mtZfsGdLcZwlTR5Z17m34R3JrtmeuLxqDkF8S3b9%2FjS--oTgt6i0Mk1uJNVSJ--uKgM5yYtJ8WZAJ2TZ4EC8w%3D%3D"
  },
  'url':'https://www.vivino.com/api/wines/1185238/tastes'

  };

module.exports = {optionsInfo, optionsTaste}