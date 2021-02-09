$(function () {
    $.getJSON("course.json", (data) => {
        // JSONデータを受信した後に実行する処理
        let output_html = ``;

        for (let i = 0; i < data.length; i++) {
            output_html += `<div class="card">`
            output_html += `<h4 class="card-header">${data[i].month}</h4>`;
            output_html += `<div class="card-body">`;

            output_html += `<table class="table table-sm table-hover">`;
            output_html += `<caption>created ${data[i].created.slice(0,10)}</caption>`
            output_html += `<thead>`;
            output_html += `<th scope="col" style="width:2.5%">#</th>`;
            output_html += `<th scope="col" colspan="2" style="width:75%">title</th>`;
            output_html += `<th scope="col" style="width:10%">difficult</th>`;
            output_html += `<th scope="col" style="width:10%">lv.</th>`;
            output_html += `</thead>`;
            output_html += `<body>`;
            for (let index = 0; index < 3; index++) {
                output_html += `<tr>`;

                output_html += `<th class="align-middle" scope="row">${data[i].track[index].trackNo}</th>`;

                if (data[i].track[index].image != "") {
                    output_html += `<td class="align-middle" style="width:15%"><img  class="rounded d-block mx-auto" src="https://chunithm-net.com/mobile/img/${data[i].track[index].image}.jpg"></td>`;
                } else {
                    output_html += `<td class="align-middle" style="width:15%"><img  class="rounded d-block mx-auto" src="https://chunithm-net.com/mobile/images/map_skill_none_icon.png"></td>`;
                };

                if (data[i].track[index].title != "") {
                    output_html += `<td class="align-middle">${data[i].track[index].title}</td>`;
                } else {
                    output_html += `<td class="align-middle">---</td>`;
                };

                if (data[i].track[index].difficult != "") {
                    if (data[i].track[index].difficult == "MASTER") {
                        output_html += `<td class="align-middle master">MAS</td>`;
                    }else if (data[i].track[index].difficult == "EXPERT") {
                        output_html += `<td class="align-middle expert">EXP</td>`;
                    }else if (data[i].track[index].difficult == "ADVANCED") {
                        output_html += `<td class="align-middle advanced">ADV</td>`;
                    }else if (data[i].track[index].difficult == "BASIC") {
                        output_html += `<td class="align-middle basic">BAS</td>`;
                    }
                } else {
                    output_html += `<td class="align-middle">---</td>`;
                };
                if (data[i].track[index].level != "") {
                    output_html += `<td class="align-middle level">${data[i].track[index].level.toFixed(1)}</td>`;
                } else {
                    output_html += `<td class="align-middle level">--.-</td>`;
                };

                output_html += `</tr>`;

            }
            output_html += `</tbody>`;
            output_html += `</table>`;

            if (data[i].rule != "") {
                output_html += `<div class="alert alert-${data[i].alert}" role="alert"><strong>LIFE：${data[i].life}</strong>　${data[i].rule}</div>`;
            } else {
                output_html += `<div class="alert alert-primary" role="alert"><strong>LIFE：0</strong>　---</div>`;
            };
            output_html += `</div>`;
            output_html += `</div>`;

        };
        $('.output').html(output_html);
    });
});
