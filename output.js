$(function () {
    $.when(
            $.getJSON("course.json"),
            $.getJSON("course_record.json")
        )
        .done(function (data1, data2) {

            console.log(data1[0], data2[0]);

            // JSONデータを受信した後に実行する処理
            let output_html = ``;
            output_html += `<div class="row">`

            for (let i = 0; i < data1[0].length; i++) {
                if (i % 3 == 0) {};
                output_html += `<div class="col-lg-6 col-xl-4">`
                output_html += `<div class="card">`
                output_html += `<h5 class="card-header">${data1[0][i].set_title}　${data1[0][i].month}</h5>`;
                output_html += `<div class="card-body">`;

                output_html += `<table class="table table-sm table-hover">`;
                output_html += `<caption>created ${data1[0][i].created.slice(0, 10)}</caption>`
                output_html += `<thead>`;
                output_html += `<th scope="col" style="width:4%">#</th>`;
                output_html += `<th scope="col" colspan="2" style="width:64%">楽曲</th>`;
                output_html += `<th scope="col" style="width:20%">難易度</th>`;
                output_html += `<th scope="col" style="width:12%">lv.</th>`;
                output_html += `</thead>`;
                output_html += `<tbody>`;
                for (let index = 0; index < 3; index++) {
                    output_html += `<tr>`;

                    output_html += `<th class="align-middle track" scope="row">${data1[0][i].track[index].trackNo}</th>`;

                    if (data1[0][i].track[index].image != "") {
                        output_html += `<td class="align-middle" style="width:12%"><img  class="rounded d-block mx-auto" src="https://chunithm-net.com/mobile/img/${data1[0][i].track[index].image}.jpg"></td>`;
                    } else {
                        output_html += `<td class="align-middle" style="width:12%"><img  class="rounded d-block mx-auto" src="https://chunithm-net.com/mobile/images/map_skill_none_icon.png"></td>`;
                    };

                    if (data1[0][i].track[index].title != "") {
                        output_html += `<td class="align-middle">${data1[0][i].track[index].title}</td>`;
                    } else {
                        output_html += `<td class="align-middle">---</td>`;
                    };

                    if (data1[0][i].track[index].difficult != "") {
                        if (data1[0][i].track[index].difficult == "MASTER") {
                            output_html += `<td class="align-middle master">MAS</td>`;
                        } else if (data1[0][i].track[index].difficult == "EXPERT") {
                            output_html += `<td class="align-middle expert">EXP</td>`;
                        } else if (data1[0][i].track[index].difficult == "ADVANCED") {
                            output_html += `<td class="align-middle advanced">ADV</td>`;
                        } else if (data1[0][i].track[index].difficult == "BASIC") {
                            output_html += `<td class="align-middle basic">BAS</td>`;
                        }
                    } else {
                        output_html += `<td class="align-middle">---</td>`;
                    };
                    if (data1[0][i].track[index].level != "") {
                        output_html += `<td class="align-middle level">${data1[0][i].track[index].level.toFixed(1)}</td>`;
                    } else {
                        output_html += `<td class="align-middle level">--.-</td>`;
                    };

                    output_html += `</tr>`;

                }
                output_html += `</tbody>`;
                output_html += `</table>`;
                //primary
                //warning
                //danger
                if (data1[0][i].rule != "") {
                    output_html += `<div class="alert alert-${data1[0][i].alert}" role="alert"><strong>LIFE：${data1[0][i].life}</strong>　${data1[0][i].rule}</div>`;
                } else {
                    output_html += `<div class="alert alert-success" role="alert"><strong>LIFE：0</strong>　---</div>`;
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
                output_html += `<tbody>`;

                if (data2[0][i] != undefined) {
                    data2[0][i].record.sort(function (a, b) {
                        if (a.score > b.score) return -1;
                        if (a.score < b.score) return 1;
                    });
                    var prescore = -1;
                    var count = 0;
                    for (let j = 0; j < data2[0][i].record.length; j++) {
                        if (data2[0][i].record[j].score != prescore) {
                            count++;
                            prescore = data2[0][i].record[j].score;
                        };
                        output_html += `<tr>`;
                        output_html += `<td class="align-middle result_ranking ranking-${count}">${count}</td>`;
                        output_html += `<td class="align-middle result_name">${data2[0][i].record[j].name}</td>`;

                        if (data2[0][i].record[j].score >= 3022500) {
                            output_html += `<td class="align-middle result_rank">SSS</td>`;
                        } else if (data2[0][i].record[j].score >= 3000000) {
                            output_html += `<td class="align-middle result_rank">SS</td>`;
                        } else if (data2[0][i].record[j].score >= 2925000) {
                            output_html += `<td class="align-middle result_rank">S</td>`;
                        } else {
                            output_html += `<td class="align-middle result_rank"></td>`;
                        };

                        output_html += `<td class="align-middle result_score">${data2[0][i].record[j].score.toLocaleString()}</td>`;
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
        })
        .fail(function () {
            console.log("Error");
        });
});
