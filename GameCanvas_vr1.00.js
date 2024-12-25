//LUNATIC
const GC_size = {};
const GC_data = {
    image: {},
    clicking_judge_box_position: [],
    clicking_judge_box_position_2: [],
    clicking_judge_box: [],
    clicking_judge_i: 0,
}
const GC = (selector) => {
    function set_pattern_and_color(elm, pattern, colors) {
        if (colors == null) {
            colors = [];
        }
        if (colors[0] == null) {
            colors[0] = ("rgba(0,0,0,0)");
        }
        if (colors[1] == null) {
            colors[1] = ("rgba(0,0,0,0)");
        }
        GC_data[elm]["context"].fillStyle = colors[0];
        GC_data[elm]["context"].strokeStyle = colors[1];
        if (pattern == "front") {
            GC_data[elm]["context"].globalCompositeOperation = ("source-over");
        } else if (pattern == "back") {
            GC_data[elm]["context"].globalCompositeOperation = ("destination-over");
        } else if (pattern == "delete") {
            GC_data[elm]["context"].globalCompositeOperation = ("copy");
        } else if (pattern == "over") {
            GC_data[elm]["context"].globalCompositeOperation = ("lighter");
        } else if (pattern == "xor") {
            GC_data[elm]["context"].globalCompositeOperation = ("xor");
        } else if (pattern == "cut") {
            GC_data[elm]["context"].globalCompositeOperation = ("destination-out");
        } else if (pattern == "trimming") {
            GC_data[elm]["context"].globalCompositeOperation = ("destination-in");
        }
    }
    function get_position(elm, x = 0, y = 0, dx = 0, dy = 0, line_size = 0, size = 0) {
        let return_pos = {};
        if (GC_data[elm]["Calculation_method"] == "px") {
            return_pos["x"] = x;
            return_pos["y"] = y;
            return_pos["dx"] = dx;
            return_pos["dy"] = dy;
            return_pos["line_size"] = line_size;
            return_pos["size"] = size;
        } else if (GC_data[elm]["Calculation_method"] == "percent") {
            return_pos["x"] = elm.width / 100 * x;
            return_pos["y"] = elm.height / 100 * y;
            return_pos["dx"] = elm.width / 100 * dx;
            return_pos["dy"] = elm.height / 100 * dy;
            return_pos["line_size"] = ((elm.height + elm.width) / 200) * line_size;
            return_pos["line_size"] = ((elm.height + elm.width) / 200) * line_size;
            return_pos["size"] = ((elm.height + elm.width) / 200) * size;
        } else if (GC_data[elm]["Calculation_method"] == "vmin") {
            return_pos["x"] = Math.vmin(elm.width, elm.height) / 100 * x;
            return_pos["y"] = Math.vmin(elm.width, elm.height) / 100 * y;
            return_pos["dx"] = Math.vmin(elm.width, elm.height) / 100 * dx;
            return_pos["dy"] = Math.vmin(elm.width, elm.height) / 100 * dy;
            return_pos["line_size"] = Math.vmin(elm.width, elm.height) / 100 * line_size;
            return_pos["line_size"] = Math.vmin(elm.width, elm.height) / 100 * line_size;
            return_pos["size"] = Math.vmin(elm.width, elm.height) / 100 * size;
        } else if (GC_data[elm]["Calculation_method"] == "vmax") {
            return_pos["x"] = Math.vmax(elm.width, elm.height) / 100 * x;
            return_pos["y"] = Math.vmax(elm.width, elm.height) / 100 * y;
            return_pos["dx"] = Math.vmax(elm.width, elm.height) / 100 * dx;
            return_pos["dy"] = Math.vmax(elm.width, elm.height) / 100 * dy;
            return_pos["line_size"] = Math.vmax(elm.width, elm.height) / 100 * line_size;
            return_pos["line_size"] = Math.vmax(elm.width, elm.height) / 100 * line_size;
            return_pos["size"] = Math.vmax(elm.width, elm.height) / 100 * size;
        };
        return return_pos;
    }
    function transform_position(elm, x = 0, y = 0) {
        let return_pos = {};
        if (GC_data[elm]["Calculation_method"] == "px") {
            return_pos["x"] = x;
            return_pos["y"] = y;
        } else if (GC_data[elm]["Calculation_method"] == "percent") {
            return_pos["x"] = elm.width / 100 * x;
            return_pos["y"] = elm.height / 100 * y;
        } else if (GC_data[elm]["Calculation_method"] == "vmin") {
            return_pos["x"] = Math.vmin(elm.width, elm.height) / 100 * x;
            return_pos["y"] = Math.vmin(elm.width, elm.height) / 100 * y;
        } else if (GC_data[elm]["Calculation_method"] == "vmax") {
            return_pos["x"] = Math.vmax(elm.width, elm.height) / 100 * x;
            return_pos["y"] = Math.vmax(elm.width, elm.height) / 100 * y;
        };
        return return_pos;
    }
    function set_translate(elm, x, y, dx, dy, x3, y3) {
        let coordinates = GC_data[elm]["coordinates"];
        GC_data[elm]["context"].save();
        let Misalignment_pos = null;
        if (coordinates != null) {
            if ((x3 == null || x3 == "wind" || x3 == "absolute" || dx == "size" || x3 == "text") && y3 == null) {
                if (x3 == "size") {
                    dx = dy;
                }
                if (x3 != "wind" && x3 != "absolute" && dx != "size" && x3 != "text") {
                    if (coordinates == "center") {
                        Misalignment_pos = [(x + (dx / 2)), (y + (dy / 2))];
                    } else if (coordinates == "left") {
                        Misalignment_pos = [x, (y + (dy / 2))];
                    } else if (coordinates == "right") {
                        Misalignment_pos = [(x + dx), (y + (dy / 2))];
                    } else if (coordinates == "top") {
                        Misalignment_pos = [(x + (dx / 2)), y];
                    } else if (coordinates == "bottom") {
                        Misalignment_pos = [(x + (dx / 2)), (y + dy)];
                    } else if (coordinates == "topright") {
                        Misalignment_pos = [(x + dx), y]
                    } else if (coordinates == "topleft") {
                        Misalignment_pos = [x, (y + dy)];
                    } else if (coordinates == "bottomright") {
                        Misalignment_pos = [(x + dx), (y + dy)];
                    } else if (coordinates == "bottomleft") {
                        Misalignment_pos = [x, (y + dy)];
                    } else {
                        Misalignment_pos = [coordinates[0], coordinates[1]];
                    }
                } else if (x3 == "wind" || dx == "size") {
                    if (coordinates == "center") {
                        Misalignment_pos = [x, y];
                    } else if (coordinates == "left") {
                        Misalignment_pos = [x - (Math.abs(dx - x) / 2), y + (Math.abs(dy - y) / 2)];
                    } else if (coordinates == "right") {
                        Misalignment_pos = [x + (Math.abs(dx - x) / 2), y + (Math.abs(dy - y) / 2)];
                    } else if (coordinates == "top") {
                        Misalignment_pos = [x, y + (Math.abs(dy - y) / 2)];
                    } else if (coordinates == "bottom") {
                        Misalignment_pos = [x, y - (Math.abs(dy - y) / 2)];
                    } else if (coordinates == "topright") {
                        Misalignment_pos = [x + (Math.abs(dx - x) / 2), y + (Math.abs(dy - y) / 2)];
                    } else if (coordinates == "topleft") {
                        Misalignment_pos = [x - (Math.abs(dx - x) / 2), y + (Math.abs(dy - y) / 2)];
                    } else if (coordinates == "bottomright") {
                        Misalignment_pos = [x + Math.abs(dx - x), y - (Math.abs(dy - y) / 2)];
                    } else if (coordinates == "bottomleft") {
                        Misalignment_pos = [x - Math.abs(dx - x), y - (Math.abs(dy - y) / 2)];
                    } else {
                        Misalignment_pos = [coordinates[0], coordinates[1]];
                    }
                } else if (x3 == "text") {
                    if (coordinates == "center") {
                        Misalignment_pos = [x + (Math.abs(dx - x) / 2), y + (Math.abs(dy - y) / 2)];
                    } else if (coordinates == "left") {
                        Misalignment_pos = [x, y + (Math.abs(dy - y) / 2)];
                    } else if (coordinates == "right") {
                        Misalignment_pos = [x + Math.abs(dx - x), y + (Math.abs(dy - y) / 2)];
                    } else if (coordinates == "top") {
                        Misalignment_pos = [x + (Math.abs(dx - x) / 2), y];
                    } else if (coordinates == "bottom") {
                        Misalignment_pos = [x + (Math.abs(dx - x) / 2), y + Math.abs(dy - y)];
                    } else if (coordinates == "topright") {
                        Misalignment_pos = [x + Math.abs(dx - x), y];
                    } else if (coordinates == "topleft") {
                        Misalignment_pos = [x, y];
                    } else if (coordinates == "bottomright") {
                        Misalignment_pos = [x + Math.abs(dx - x), y + Math.abs(dy - y)];
                    } else if (coordinates == "bottomleft") {
                        Misalignment_pos = [x, y + Math.abs(dy - y)];
                    } else {
                        Misalignment_pos = [coordinates[0], coordinates[1]];
                    }
                }
            } else if (x3 != null && y3 != null && dx != "size") {
                if (coordinates == "center") {
                    Misalignment_pos = [(x + dx + x3) / 3, (y + dy + y3) / 3];
                } else if (coordinates == "left") {
                    Misalignment_pos = [Math.min(x, dx, x3), (y + dy + y3) / 3];
                } else if (coordinates == "right") {
                    Misalignment_pos = [Math.max(x, dx, x3), (y + dy + y3) / 3];
                } else if (coordinates == "top") {
                    Misalignment_pos = [(x + dx + x3) / 3, Math.min(y, dy, y3)];
                } else if (coordinates == "bottom") {
                    Misalignment_pos = [(x + dx + x3) / 3, Math.max(y, dy, y3)];
                } else if (coordinates == "topright") {
                    Misalignment_pos = [Math.max(x, dx, x3), Math.min(y, dy, y3)];
                } else if (coordinates == "topleft") {
                    Misalignment_pos = [Math.min(x, dx, x3), Math.min(y, dy, y3)];
                } else if (coordinates == "bottomright") {
                    Misalignment_pos = [Math.max(x, dx, x3), Math.max(y, dy, y3)];
                } else if (coordinates == "bottomleft") {
                    Misalignment_pos = [Math.min(x, dx, x3), Math.max(y, dy, y3)];
                } else {
                    Misalignment_pos = [coordinates[0], coordinates[1]];
                }
            }
            GC_data[elm]["context"].translate(Misalignment_pos[0], Misalignment_pos[1]);
            if (GC_data[elm]["context_data"] != null) {
                GC_data[elm]["context"].scale(GC_data[elm]["context_data"]["scale"][0], GC_data[elm]["context_data"]["scale"][1]);
                GC_data[elm]["context"].rotate(GC_data[elm]["context_data"]["rotate"]);
                GC_data[elm]["context"].shadowBlur = GC_data[elm]["context_data"]["shadowBlur"];
                GC_data[elm]["context"].shadowColor = GC_data[elm]["context_data"]["shadowColor"];
                GC_data[elm]["context"].shadowOffsetX = GC_data[elm]["context_data"]["shadowOffsetX"];
                GC_data[elm]["context"].shadowOffsetY = GC_data[elm]["context_data"]["shadowOffsetY"];
                if (GC_data[elm]["context_data"]["Gradient"] != null) {
                    console.log(GC_data[elm]["context_data"]["Gradient"])
                    if (GC_data[elm]["context_data"]["Gradient"]["type"] == "Conic") {
                        let pos = transform_position(elm, GC_data[elm]["context_data"]["Gradient"]["method"][1], GC_data[elm]["context_data"]["Gradient"]["method"][2]);
                        const gradient = GC_data[elm]["context"].createConicGradient(GC_data[elm]["context_data"]["Gradient"]["method"][0], pos.x, pos.y);
                        for (const key in GC_data[elm]["context_data"]["Gradient"]["value_and_color"]) {
                            if (Object.prototype.hasOwnProperty.call(GC_data[elm]["context_data"]["Gradient"]["value_and_color"], key)) {
                                const element = GC_data[elm]["context_data"]["Gradient"]["value_and_color"][key];
                                gradient.addColorStop(key, element);
                                console.log(gradient);
                            }
                        }
                        GC_data[elm]["context"].fillStyle = gradient;
                    } else if (GC_data[elm]["context_data"]["Gradient"]["type"] == "Linear") {
                        let pos = transform_position(elm, GC_data[elm]["context_data"]["Gradient"]["method"][0], GC_data[elm]["context_data"]["Gradient"]["method"][1]);
                        let pos2 = transform_position(elm, GC_data[elm]["context_data"]["Gradient"]["method"][2], GC_data[elm]["context_data"]["Gradient"]["method"][3]);
                        const gradient = GC_data[elm]["context"].createLinearGradient(pos.x, pos.y, pos2.x, pos2.y);
                        for (const key in GC_data[elm]["context_data"]["Gradient"]["value_and_color"]) {
                            if (Object.prototype.hasOwnProperty.call(GC_data[elm]["context_data"]["Gradient"]["value_and_color"], key)) {
                                const element = GC_data[elm]["context_data"]["Gradient"]["value_and_color"][key];
                                gradient.addColorStop(key, element);
                            }
                        }
                        GC_data[elm]["context"].fillStyle = gradient;
                    } else if (GC_data[elm]["context_data"]["Gradient"]["type"] == "Radial") {
                        let pos = transform_position(elm, GC_data[elm]["context_data"]["Gradient"]["method"][0], GC_data[elm]["context_data"]["Gradient"]["method"][1]);
                        let pos2 = transform_position(elm, GC_data[elm]["context_data"]["Gradient"]["method"][3], GC_data[elm]["context_data"]["Gradient"]["method"][4]);
                        const gradient = GC_data[elm]["context"].createRadialGradient(pos.x, pos.y, GC_data[elm]["context_data"]["Gradient"]["method"][2], pos2.x, pos2.y, GC_data[elm]["context_data"]["Gradient"]["method"][5]);
                        for (const key in GC_data[elm]["context_data"]["Gradient"]["value_and_color"]) {
                            if (Object.prototype.hasOwnProperty.call(GC_data[elm]["context_data"]["Gradient"]["value_and_color"], key)) {
                                const element = GC_data[elm]["context_data"]["Gradient"]["value_and_color"][key];
                                gradient.addColorStop(key, element);
                            }
                        }
                        GC_data[elm]["context"].fillStyle = gradient;
                    }
                }
            }
            GC_data[elm]["context"].translate(-Misalignment_pos[0], -Misalignment_pos[1]);
        }
    }
    if (selector == null) {
        selector = "canvas";
    }
    const elm = document.querySelectorAll(selector);
    return {
        elm,
        size: GC_size[elm[0]],
        url: function () { elm[0].toDataURL("image/png") },
        set: {
            size: function (width, height) {
                if (GC_data[elm] == null) {
                    GC_data[elm] = {};
                }
                elm.forEach(elm => {
                    GC_size[elm] = { width: width, height: height };
                    elm.width = GC_size[elm].width;
                    elm.height = GC_size[elm].height;
                });
            },
            quality: function (quality) {
                if (GC_data[elm] == null) {
                    GC_data[elm] = {};
                }
                elm.forEach(elm => {
                    if (quality == "very_low") {
                        quality = 0.25;
                    } else if (quality == "low") {
                        quality = 0.5;
                    } else if (quality == "little_low") {
                        quality = 0.75;
                    } else if (quality == "normal") {
                        quality = 1;
                    } else if (quality == "little_hight") {
                        quality = 1.5;
                    } else if (quality == "high") {
                        quality = 2;
                    } else if (quality == "very_high") {
                        quality = 3;
                    } else if (quality == "extra") {
                        quality = 5;
                    } else if (quality == "ultra") {
                        quality = 10;
                    } else if (Number(quality) > 0) {
                        quality = Number(quality);
                    } else {
                        quality = 1;
                    }
                    elm.width = GC_size[elm].width * quality;
                    elm.height = GC_size[elm].height * quality;
                    elm.style.width = (`${GC_size[elm].width}px`);
                    elm.style.height = (`${GC_size[elm].height}px`);
                });
            },
            effect: function (coordinates = null, scale = [1, 1], rotate = 0.0, shadow = { Blur: 0, Color: "rgba(0,0,0,0)", OffsetX: 0, OffsetY: 0 }, Gradient = [{ type: "Conic/Linear/Radial", method: [], value_and_color: [] }]) {
                elm.forEach(elm => {
                    if (GC_data[elm] == null) {
                        GC_data[elm] = {};
                    }
                    GC_data[elm]["coordinates"] = coordinates;
                    if (scale == null) {
                        scale = [1, 1];
                    }
                    if (GC_data[elm]["context_data"] == null) {
                        GC_data[elm]["context_data"] = {};
                    }
                    GC_data[elm]["context_data"]["scale"] = [scale[0], scale[1]];
                    GC_data[elm]["context_data"]["rotate"] = (rotate * Math.PI / 180);
                    GC_data[elm]["context_data"]["shadowBlur"] = shadow.Blur;
                    GC_data[elm]["context_data"]["shadowColor"] = shadow.Color;
                    GC_data[elm]["context_data"]["shadowOffsetX"] = shadow.OffsetX;
                    GC_data[elm]["context_data"]["shadowOffsetY"] = shadow.OffsetY;
                    GC_data[elm]["context_data"]["Gradient"] = Gradient;
                })
            }
        },
        draw: {
            start: function (type) {
                elm.forEach(elm => {
                    if (GC_data[elm] == null) {
                        GC_data[elm] = {};
                    }
                    GC_data[elm]["context"] = elm.getContext("2d");
                    if (type == "px" || type == "percent" || type == "vmin" || type == "vmax") {
                        GC_data[elm]["Calculation_method"] = type;
                    } else {
                        console.error();
                    }
                })
            },
            stop: function () {
                if (GC_data[elm] == null) {
                    GC_data[elm] = {};
                }
                elm.forEach(elm => {
                    GC_data[elm]["context"] = null;
                    GC_data[elm]["Calculation_method"] = null;
                })
            },
            box: function (x, y, dx, dy, fill_color, line_color, line_size, pattern) {
                elm.forEach(elm => {
                    GC_data[elm]["context"].beginPath();
                    set_pattern_and_color(elm, pattern, [fill_color, line_color]);
                    let pos = get_position(elm, x, y, dx, dy, line_size);
                    set_translate(elm, pos.x, pos.y, pos.dx, pos.dy);
                    GC_data[elm]["context"].rect(pos.x, pos.y, pos.dx, pos.dy);
                    GC_data[elm]["context"].lineWidth = pos.line_size;
                    GC_data[elm]["context"].fill();
                    GC_data[elm]["context"].stroke();
                    GC_data[elm]["context"].restore();
                })
            },
            line: function (x, y, dx, dy, color, size, pattern) {
                elm.forEach(elm => {
                    GC_data[elm]["context"].beginPath();
                    set_pattern_and_color(elm, pattern, [null, color]);
                    let pos = get_position(elm, x, y, dx, dy, null, size);
                    set_translate(elm, pos.x, pos.y, pos.dx, pos.dy);
                    GC_data[elm]["context"].lineWidth = pos.size;
                    GC_data[elm]["context"].moveTo(pos.x, pos.y);
                    GC_data[elm]["context"].lineTo(pos.dx, pos.dy);
                    GC_data[elm]["context"].fill();
                    GC_data[elm]["context"].stroke();
                    GC_data[elm]["context"].restore();
                })
            },
            circle: function (x, y, size, line_size, color, line_color, pattern) {
                elm.forEach(elm => {
                    GC_data[elm]["context"].beginPath();
                    set_pattern_and_color(elm, pattern, [color, line_color]);
                    let pos = get_position(elm, x, y, null, null, line_size, size);
                    set_translate(elm, pos.x, pos.y, "size", pos.size);
                    GC_data[elm]["context"].arc(pos.x, pos.y, pos.size, 0 * Math.PI / 180, 360 * Math.PI / 180, false);
                    GC_data[elm]["context"].lineWidth = pos.line_size;
                    GC_data[elm]["context"].fill();
                    GC_data[elm]["context"].stroke();
                    GC_data[elm]["context"].restore();
                })
            },
            circle_outline: function (x, y, size, line_size, startAngle, endAngle, color, pattern) {
                elm.forEach(elm => {
                    GC_data[elm]["context"].beginPath();
                    set_pattern_and_color(elm, pattern, [null, color]);
                    let pos = get_position(elm, x, y, null, null, line_size, size);
                    set_translate(elm, pos.x, pos.y, "size", pos.size);
                    startAngle = startAngle * Math.PI / 180;
                    endAngle = endAngle * Math.PI / 180;
                    GC_data[elm]["context"].lineWidth = pos.line_size;
                    GC_data[elm]["context"].beginPath();
                    GC_data[elm]["context"].arc(pos.x, pos.y, pos.size, startAngle, endAngle);
                    GC_data[elm]["context"].stroke();
                    GC_data[elm]["context"].restore();
                })
            },
            sector: function (x, y, size, line_size, startAngle, endAngle, color, line_color, pattern) {
                elm.forEach(elm => {
                    GC_data[elm]["context"].beginPath();
                    set_pattern_and_color(elm, pattern, [color, line_color]);
                    let pos = get_position(elm, x, y, null, null, line_size, size);
                    set_translate(elm, pos.x, pos.y, "size", pos.size);
                    GC_data[elm]["context"].moveTo(pos.x, pos.y);
                    GC_data[elm]["context"].arc(pos.x, pos.y, pos.size, startAngle * Math.PI / 180, endAngle * Math.PI / 180, false);
                    GC_data[elm]["context"].lineTo(pos.x, pos.y);
                    GC_data[elm]["context"].lineWidth = pos.line_size;
                    GC_data[elm]["context"].fill();
                    GC_data[elm]["context"].stroke();
                    GC_data[elm]["context"].restore();
                })
            },
            image: function (img_url, x, y, size, keep_the_original = false, pattern) {
                elm.forEach(elm => {
                    if (GC_data["image"][img_url] == null) {
                        GC_data["image"][img_url] = new Image();
                        GC_data["image"][img_url].src = img_url;
                    }
                    set_pattern_and_color(elm, pattern, [null, null]);
                    let pos = get_position(elm, x, y, null, null, null, size);
                    if (keep_the_original) {
                        prediction_size = { w: pos.size, h: pos.size * (GC_data["image"][img_url].height / GC_data["image"][img_url].width) };
                    } else {
                        prediction_size = { w: pos.size, h: pos.size };
                    }
                    set_translate(elm, pos.x, pos.y, prediction_size.w, prediction_size.h, "wind");
                    GC_data[elm]["context"].beginPath();
                    GC_data[elm]["context"].drawImage(GC_data["image"][img_url], pos.x - (prediction_size.w / 2), pos.y - (prediction_size.h / 2), prediction_size.w, prediction_size.h);
                    GC_data[elm]["context"].stroke();
                    GC_data[elm]["context"].restore();
                })
            },
            triangle: function (positions = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0], color, line_color, line_size, pattern) {
                elm.forEach(elm => {
                    GC_data[elm]["context"].beginPath();
                    set_pattern_and_color(elm, pattern, [color, line_color]);
                    let pos = get_position(elm, positions[0], positions[1], positions[2], positions[3], line_size, null);
                    let pos2 = get_position(elm, positions[4], positions[5], null, null, null, null);
                    set_translate(elm, pos.x, pos.y, pos.dx, pos.dy, pos2.x, pos2.y);
                    GC_data[elm]["context"].moveTo(pos.x, pos.y);
                    GC_data[elm]["context"].lineTo(pos.dx, pos.dy);
                    GC_data[elm]["context"].lineTo(pos2.x, pos2.y);
                    GC_data[elm]["context"].lineTo(pos.x, pos.y);
                    GC_data[elm]["context"].lineWidth = pos.line_size;
                    GC_data[elm]["context"].fill();
                    GC_data[elm]["context"].stroke();
                    GC_data[elm]["context"].restore();
                })
            },
            text: function (x, y, text, color, size, line_color, line_size, font, pattern, textAlign, direction) {
                elm.forEach(elm => {
                    GC_data[elm]["context"].beginPath();
                    set_pattern_and_color(elm, pattern, [color, line_color]);
                    let pos = get_position(elm, x, y, null, null, line_size, size);
                    GC_data[elm]["context"].font = `${pos.size}pt ${font}`;
                    GC_data[elm]["context"].textAlign = textAlign;
                    let measure = GC_data[elm]["context"].measureText(text);
                    set_translate(elm, pos.x - measure.actualBoundingBoxLeft, pos.y - measure.actualBoundingBoxAscent, (pos.x - measure.actualBoundingBoxLeft) + (GC_data[elm]["context"].measureText(text).width), pos.y + (measure.actualBoundingBoxDescent), "text");
                    if (Math.floor(Math.random() * 100) == 0) {
                        console.log(size, pos.x - measure.actualBoundingBoxLeft, pos.y, (pos.x - measure.actualBoundingBoxLeft) + (GC_data[elm]["context"].measureText(text).width), pos.y + (measure.actualBoundingBoxDescent));
                        if (Math.floor(Math.random() * 10) == 0) {
                            console.log(GC_data[elm]["context"].measureText(text));
                        }
                    }
                    GC_data[elm]["context"].lineWidth = pos.line_size;
                    GC_data[elm]["context"].direction = direction;
                    GC_data[elm]["context"].strokeText(text, pos.x, pos.y);
                    GC_data[elm]["context"].fillText(text, pos.x, pos.y);
                    GC_data[elm]["context"].stroke();
                    GC_data[elm]["context"].restore();
                })
            }
        },
        clear: function (x, y, dx, dy) {
            elm.forEach(elm => {
                let pos = get_position(elm, x, y, dx, dy);
                set_translate(elm, x, y, dx, dy);
                GC_data[elm]["context"].beginPath();
                GC_data[elm]["context"].clearRect(pos.x, pos.y, pos.dx, pos.dy);
                GC_data[elm]["context"].stroke();
                GC_data[elm]["context"].restore();
            })
        },
        loop: function (function_name) {
            let d = (new Date).getTime();
            let fps = 0;
            let temp_fps = 0;
            setInterval(function () {
                fps = temp_fps;
                temp_fps = 0;
            }, 1000)
            function loop_temp() {
                temp_fps++;
                requestAnimationFrame(function_name.bind(this, ((new Date).getTime() - d), fps));
                d = (new Date).getTime();
                requestAnimationFrame(loop_temp);
            }
            loop_temp();
        },
        GetEvent: {
            click: function (function_name) {
                elm.forEach(elm => {
                    elm.addEventListener("click", function (e) {
                        var clientRect = element_.getBoundingClientRect();
                        let pos = transform_position(elm, e.clientX - clientRect.left, e.clientY - clientRect.top);
                        setTimeout(function_name, 0, pos.x, pos.y);
                    })
                })
            },
            menu: function (function_name) {
                elm.forEach(elm => {
                    elm.addEventListener("contextmenu", function (e) {
                        var clientRect = element_.getBoundingClientRect();
                        let pos = transform_position(elm, e.clientX - clientRect.left, e.clientY - clientRect.top);
                        setTimeout(function_name, 0, pos.x, pos.y);
                    })
                })
            },
            move: function (function_name) {
                elm.forEach(elm => {
                    elm.addEventListener("touchmove", function (e) {
                        var clientRect = element_.getBoundingClientRect();
                        let pos = transform_position(elm, e.touches[0].pageX - clientRect.left, e.touches[0].pageY - clientRect.top);
                        setTimeout(function_name, 0, pos.x, pos.y);
                    })
                    elm.addEventListener("mousemove", function (e) {
                        var clientRect = element_.getBoundingClientRect();
                        let pos = transform_position(elm, e.clientX - clientRect.left, e.clientY - clientRect.top);
                        setTimeout(function_name, 0, pos.x, pos.y);
                    })
                })
            },
            clicking: function (functions) {
                elm.forEach(elm => {
                    GC_data.clicking_judge_box.push(false);
                    GC_data.clicking_judge_box_position.push([0, 0]);
                    GC_data.clicking_judge_box_position_2.push([0, 0]);
                    let i = GC_data.clicking_judge_i;
                    elm.addEventListener("touchstart", function (e) {
                        var clientRect = elm.getBoundingClientRect();
                        let pos1 = transform_position(elm, (e.touches[0].pageX - clientRect.left), (e.touches[0].pageY - clientRect.top));
                        GC_data.clicking_judge_box_position_2[i] = ([pos1.x, pos1.y]);
                        GC_data.clicking_judge_box_position[i] = ([pos1.x, pos1.y]);
                        GC_data.clicking_judge_box[i] = true;
                    })
                    elm.addEventListener("mousedown", function (e) {
                        var clientRect = elm.getBoundingClientRect();
                        let pos1 = transform_position(elm, e.clientX - clientRect.left, e.clientY - clientRect.top);
                        GC_data.clicking_judge_box_position_2[i] = ([pos1.x, pos1.y]);
                        GC_data.clicking_judge_box[i] = true;
                    })
                    elm.addEventListener("touchend", function (e) {
                        GC_data.clicking_judge_box[i] = false;
                    })
                    elm.addEventListener("mouseup", function (e) {
                        GC_data.clicking_judge_box[i] = false;
                    })
                    elm.addEventListener("touchmove", function (e) {
                        if (GC_data.clicking_judge_box[i]) {
                            var clientRect = elm.getBoundingClientRect();
                            let pos1 = transform_position(elm, e.touches[0].pageX - clientRect.left, e.touches[0].pageY - clientRect.top);
                            GC_data.clicking_judge_box_position[i] = ([pos1.x, pos1.y]);
                        }
                    })
                    elm.addEventListener("mousemove", function (e) {
                        if (GC_data.clicking_judge_box[i]) {
                            var clientRect = elm.getBoundingClientRect();
                            let pos1 = transform_position(top, e.clientX - clientRect.left, e.clientY - clientRect.top);
                            GC_data.clicking_judge_box_position[i] = ([pos1.x, pos1.y]);
                        }
                    })
                    setInterval(function () {
                        if (GC_data.clicking_judge_box[i]) {
                            setTimeout(functions, 0, GC_data.clicking_judge_box_position[i][0], GC_data.clicking_judge_box_position[i][1], GC_data.clicking_judge_box_position_2[i][0], GC_data.clicking_judge_box_position_2[i][1]);
                        }
                    })
                    GC_data.clicking_judge_i++;
                })
            },
        }
    }
}
