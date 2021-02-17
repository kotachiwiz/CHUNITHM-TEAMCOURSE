$(function () {
    let data1 = "";
    let data2 = "";

    function data_import() {
        $.when(
                $.getJSON("course.json"),
                $.getJSON("course_record.json")
            )
            .done(function (data1_raw, data2_raw) {

                data1 = data1_raw[0];
                data2 = data2_raw[0];
                console.log(data1, data2);
                output();
            })
            .fail(function () {
                console.log("Error");
            });
    };

    function output() {
        // JSONデータを受信した後に実行する処理
        let output_html = ``;
        output_html += `<div class="row">`

        for (let i = 0; i < data1.length; i++) {
            if (i % 3 == 0) {};
            output_html += `<div class="col-lg-6 col-xxl-4">`
            output_html += `<div class="card">`
            output_html += `<h5 class="card-header">${data1[i].set_title}　${data1[i].month}</h5>`;
            output_html += `<div class="card-body">`;

            output_html += `<table class="table table-sm table-hover"  style="table-layout:fixed;">`;
            //output_html += `<caption>created ${data1[i].created.slice(0, 10)}</caption>`
            output_html += `<thead>`;
            output_html += `<th scope="col">Track 1</th>`;
            output_html += `<th scope="col">Track 2</th>`;
            output_html += `<th scope="col">Track 3</th>`;
            output_html += `</thead>`;

            output_html += `<tbody>`;

            output_html += `<tr>`; //2段目　画像
            for (let k = 0; k < 3; k++) {
                if (data1[i].track[0].image != "") {
                    output_html += `<td class="align-middle td-top"><img  class="rounded d-block mx-auto" src="https://chunithm-net.com/mobile/img/${data1[i].track[k].image}.jpg"></td>`;
                } else {
                    output_html += `<td class="align-middle td-top"><img  class="rounded d-block mx-auto" src="https://chunithm-net.com/mobile/images/map_skill_none_icon.png"></td>`;
                };
            }
            output_html += `</tr>`;

            output_html += `<tr>`; //3段目　楽曲名

            String.prototype.bytes = function () {
                var length = 0;
                for (var i = 0; i < this.length; i++) {
                    var c = this.charCodeAt(i);
                    if ((c >= 0x0 && c < 0x81) || (c === 0xf8f0) || (c >= 0xff61 && c < 0xffa0) || (c >= 0xf8f1 && c < 0xf8f4)) {
                        length += 1;
                    } else {
                        length += 2;
                    }
                }
                return length;
            };

            for (let k = 0; k < 3; k++) {
                console.log(data1[i].track[k].title.bytes())
                if (data1[i].track[k].title != "" && data1[i].track[k].title.bytes() > 29) {
                    output_html += `<td class="align-middle title-long">${data1[i].track[k].title}</td>`;
                } else if (data1[i].track[k].title != "") {
                    output_html += `<td class="align-middle">${data1[i].track[k].title}</td>`;
                } else {
                    output_html += `<td class="align-middle">---</td>`;
                };
            }
            output_html += `</tr>`;

            output_html += `<tr>`; //4段目　難易度
            for (let k = 0; k < 3; k++) {
                if (data1[i].track[k].difficult != "") {
                    if (data1[i].track[k].difficult == "MASTER") {
                        output_html += `<td class="align-middle master">MASTER</td>`;
                    } else if (data1[i].track[k].difficult == "EXPERT") {
                        output_html += `<td class="align-middle expert">EXPERT</td>`;
                    } else if (data1[i].track[k].difficult == "ADVANCED") {
                        output_html += `<td class="align-middle advanced">ADVANCED</td>`;
                    } else if (data1[i].track[k].difficult == "BASIC") {
                        output_html += `<td class="align-middle basic">BASIC</td>`;
                    }
                } else {
                    output_html += `<td class="align-middle">---</td>`;
                };
            }

            //小数点以下判定
            function decimalPart(num, decDigits) {
                var decPart = num - ((num >= 0) ? Math.floor(num) : Math.ceil(num));
                return decPart.toFixed(decDigits);
            }

            output_html += `<tr>`; //5段目　レベル

            for (let k = 0; k < 3; k++) {
                if (data1[i].track[k].level != "" && decimalPart(data1[i].track[k].level, 1) < 0.7) {
                    output_html += `<td class="align-middle level">Lv.<span class="lv-num">${Math.floor(data1[i].track[k].level)}</span>/<span class="lv-num">${data1[i].track[k].level.toFixed(1)}</span></td>`;
                } else if (data1[i].track[k].level != "" && decimalPart(data1[i].track[k].level, 1) >= 0.7) {
                    output_html += `<td class="align-middle level">Lv.<span class="lv-num">${Math.floor(data1[i].track[k].level)}+</span>/<span class="lv-num">${data1[i].track[k].level.toFixed(1)}</span></td>`;
                } else {
                    output_html += `<td class="align-middle level">Lv.<span class="lv-num">---</span>/<span class="lv-num">---</span></td>`;
                };
            }
            output_html += `</tr>`;

            output_html += `</tbody>`;
            output_html += `</table>`;
            //primary
            //success
            //warning
            //danger
            if (data1[i].rule != "") {
                output_html += `<div class="alert alert-${data1[i].alert}" role="alert"><strong>LIFE：${data1[i].life}</strong>　${data1[i].rule}</div>`;
            } else {
                output_html += `<div class="alert alert-primary" role="alert"><strong>LIFE：0</strong>　---</div>`;
            };

            output_html += `<hr>`;
            output_html += `<button class="btn btn-outline-primary" type="button" data-toggle="collapse" data-target="#collapseExample${i}" aria-expanded="false" aria-controls="collapseExample${i}">Result Ranking</button>`;

            output_html += `<div class="collapse" id="collapseExample${i}">`;
            output_html += `<table class="table table-sm table-hover table-rec">`;
            output_html += `<thead>`;
            output_html += `<th scope="col" style="width:10%">#</th>`;
            output_html += `<th scope="col">名前</th>`;
            output_html += `<th scope="col" style="width:20%">ランク</th>`;
            output_html += `<th scope="col" style="width:25%">スコア</th>`;
            output_html += `</thead>`;

            var courseNo = data1[i].courseNo;
            //console.log(courseNo);
            var course_result = data2.filter(data => data.courseNo == courseNo);
            console.log(course_result[0]);
            //courseNoと同じNoのレコードを抽出

            if (course_result.length >= 1) {
                output_html += `<caption>updated ${course_result[0].update}</caption>`
                output_html += `<tbody>`;

                (course_result[0].record).sort(function (a, b) {
                    if (a.score > b.score) return -1;
                    if (a.score < b.score) return 1;
                });
                //スコア降順ソート

                var prescore = -1;
                var count = 0;
                for (let j = 0; j < course_result[0].record.length; j++) {
                    if (course_result[0].record[j].score != prescore) {
                        count++;
                        prescore = course_result[0].record[j].score;
                    };
                    let tdtdtop = "";
                    if (count == 1) {
                        iftdtop = "td-top";
                    } else {
                        iftdtop = "";
                    }
                    output_html += `<tr>`;
                    output_html += `<td class="align-middle ${iftdtop} result_ranking ranking-${count}">${count}</td>`;
                    output_html += `<td class="align-middle ${iftdtop} result_name">${course_result[0].record[j].name}</td>`;

                    if (course_result[0].record[j].score >= 3022500) {
                        output_html += `<td class="align-middle ${iftdtop} result_rank">SSS</td>`;
                    } else if (course_result[0].record[j].score >= 3000000) {
                        output_html += `<td class="align-middle ${iftdtop} result_rank">SS</td>`;
                    } else if (course_result[0].record[j].score >= 2925000) {
                        output_html += `<td class="align-middle ${iftdtop} result_rank">S</td>`;
                    } else {
                        output_html += `<td class="align-middle ${iftdtop} result_rank"></td>`;
                    };

                    output_html += `<td class="align-middle ${iftdtop} result_score">${course_result[0].record[j].score.toLocaleString()}</td>`;
                    output_html += `</tr>`;
                };
            };
            output_html += `</tbody>`;
            output_html += `</table>`;
            output_html += `</div>`;

            output_html += `</div>`;
            output_html += `</div>`;
            output_html += `</div>`;
        };
        output_html += `</div">`
        $('.output').html(output_html);

    };
    data_import();

    function sort_up() {
        data1.sort(function (a, b) {
            if (a.courseNo > b.courseNo) return -1;
            if (a.courseNo < b.courseNo) return 1;
        });
        output();
    };

    function sort_down() {
        data1.sort(function (a, b) {
            if (a.courseNo < b.courseNo) return -1;
            if (a.courseNo > b.courseNo) return 1;
        });
        output();
    }

    $(".option1").on("click", sort_down);
    $(".option2").on("click", sort_up);



});
