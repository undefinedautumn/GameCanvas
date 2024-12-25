const GC_size = {};
const GC_data = {
    image: {},
    is_loaded_image: {},
    clicking_judge_box_position: [],
    clicking_judge_box_position_2: [],
    clicking_judge_box: [],
    clicking_judge_i: 0,
    object: {},
    input_key: []
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
            return_pos["x"] = x * GC_data[elm]["quality"];
            return_pos["y"] = y * GC_data[elm]["quality"];
            return_pos["dx"] = dx * GC_data[elm]["quality"];
            return_pos["dy"] = dy * GC_data[elm]["quality"];
            return_pos["line_size"] = line_size * GC_data[elm]["quality"];
            return_pos["size"] = size * GC_data[elm]["quality"];
        } else if (GC_data[elm]["Calculation_method"] == "percent") {
            return_pos["x"] = elm.width / 100 * x;
            return_pos["y"] = elm.height / 100 * y;
            return_pos["dx"] = elm.width / 100 * dx;
            return_pos["dy"] = elm.height / 100 * dy;
            return_pos["line_size"] = ((elm.height + elm.width) / 200) * line_size;
            return_pos["line_size"] = ((elm.height + elm.width) / 200) * line_size;
            return_pos["size"] = ((elm.height + elm.width) / 200) * size;
        } else if (GC_data[elm]["Calculation_method"] == "vmin") {
            return_pos["x"] = Math.min(elm.width, elm.height) / 100 * x;
            return_pos["y"] = Math.min(elm.width, elm.height) / 100 * y;
            return_pos["dx"] = Math.min(elm.width, elm.height) / 100 * dx;
            return_pos["dy"] = Math.min(elm.width, elm.height) / 100 * dy;
            return_pos["line_size"] = Math.min(elm.width, elm.height) / 100 * line_size;
            return_pos["line_size"] = Math.min(elm.width, elm.height) / 100 * line_size;
            return_pos["size"] = Math.min(elm.width, elm.height) / 100 * size;
        } else if (GC_data[elm]["Calculation_method"] == "vmax") {
            return_pos["x"] = Math.max(elm.width, elm.height) / 100 * x;
            return_pos["y"] = Math.max(elm.width, elm.height) / 100 * y;
            return_pos["dx"] = Math.max(elm.width, elm.height) / 100 * dx;
            return_pos["dy"] = Math.max(elm.width, elm.height) / 100 * dy;
            return_pos["line_size"] = Math.max(elm.width, elm.height) / 100 * line_size;
            return_pos["line_size"] = Math.max(elm.width, elm.height) / 100 * line_size;
            return_pos["size"] = Math.max(elm.width, elm.height) / 100 * size;
        };
        return return_pos;
    }
    function transform_position(elm, x = 0, y = 0, size = 0) {
        let return_pos = {};
        if (GC_data[elm]["Calculation_method"] == "px") {
            return_pos["x"] = x * GC_data[elm]["quality"];
            return_pos["y"] = y * GC_data[elm]["quality"];
            return_pos["size"] = size * GC_data[elm]["quality"];
        } else if (GC_data[elm]["Calculation_method"] == "percent") {
            return_pos["x"] = elm.width / 100 * x;
            return_pos["y"] = elm.height / 100 * y;
            return_pos["size"] = (elm.width + elm.height) / 200 * size;
        } else if (GC_data[elm]["Calculation_method"] == "vmin") {
            return_pos["x"] = Math.min(elm.width, elm.height) / 100 * x;
            return_pos["y"] = Math.min(elm.width, elm.height) / 100 * y;
            return_pos["size"] = Math.min(elm.width, elm.height) / 100 * size;
        } else if (GC_data[elm]["Calculation_method"] == "vmax") {
            return_pos["x"] = Math.max(elm.width, elm.height) / 100 * x;
            return_pos["y"] = Math.max(elm.width, elm.height) / 100 * y;
            return_pos["size"] = Math.max(elm.width, elm.height) / 100 * size;
        };
        return return_pos;
    }
    function Un_transform_position(elm, x = 0, y = 0, size = 0) {
        let return_pos = {};
        if (GC_data[elm]["Calculation_method"] == "px") {
            return_pos["x"] = x / GC_data[elm]["quality"];
            return_pos["y"] = y / GC_data[elm]["quality"];
            return_pos["size"] = size / GC_data[elm]["quality"];
        } else if (GC_data[elm]["Calculation_method"] == "percent") {
            return_pos["x"] = x / elm.width * 100;
            return_pos["y"] = y / elm.height * 100;
            return_pos["size"] = size / (elm.width + elm.height) * 200;
        } else if (GC_data[elm]["Calculation_method"] == "vmin") {
            return_pos["x"] = x / Math.min(elm.width, elm.height) * 100;
            return_pos["y"] = y / Math.min(elm.width, elm.height) * 100;
            return_pos["size"] = size / Math.min(elm.width, elm.height) * 100;
        } else if (GC_data[elm]["Calculation_method"] == "vmax") {
            return_pos["x"] = x / Math.max(elm.width, elm.height) * 100;
            return_pos["y"] = y / Math.max(elm.width, elm.height) * 100;
            return_pos["size"] = size / Math.max(elm.width, elm.height) * 100;
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
                    if (GC_data[elm]["context_data"]["Gradient"]["type"] == "Conic") {
                        let pos = transform_position(elm, GC_data[elm]["context_data"]["Gradient"]["method"][1], GC_data[elm]["context_data"]["Gradient"]["method"][2]);
                        const gradient = GC_data[elm]["context"].createConicGradient(GC_data[elm]["context_data"]["Gradient"]["method"][0], pos.x, pos.y);
                        for (const key in GC_data[elm]["context_data"]["Gradient"]["value_and_color"]) {
                            if (Object.prototype.hasOwnProperty.call(GC_data[elm]["context_data"]["Gradient"]["value_and_color"], key)) {
                                const element = GC_data[elm]["context_data"]["Gradient"]["value_and_color"][key];
                                gradient.addColorStop(key, element);
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
        if (GC_data[elm]["debug"] != null) {
            if (GC_data[elm]["debug"]["T_F"]) {
                let bu_strokeStyle = GC_data[elm]["context"].strokeStyle;
                let bu_lineWidth = GC_data[elm]["context"].lineWidth;
                let bu_fillStyle = GC_data[elm]["context"].fillStyle;
                GC_data[elm]["context"].beginPath();
                GC_data[elm]["context"].strokeStyle = ("rgba(0,255,0,0.25)");
                GC_data[elm]["context"].fillStyle = ("rgba(0,255,0,0.25)");
                GC_data[elm]["context"].lineWidth = 10;
                GC_data[elm]["context"].setLineDash([]);
                if (GC_data[elm]["debug"]["size"] != null) {
                    GC_data[elm]["context"].lineWidth = GC_data[elm]["debug"]["size"];
                }
                if (GC_data[elm]["debug"]["color"] != null) {
                    GC_data[elm]["context"].strokeStyle = GC_data[elm]["debug"]["color"];
                }
                if (GC_data[elm]["debug"]["color"] != null) {
                    GC_data[elm]["context"].fillStyle = GC_data[elm]["debug"]["color"];
                }
                if (GC_data[elm]["debug"]["dash"] != null) {
                    GC_data[elm]["context"].setLineDash(GC_data[elm]["debug"]["dash"]);
                }
                if (x != null) {
                    GC_data[elm]["context"].moveTo(x, 0);
                    GC_data[elm]["context"].lineTo(x, elm.height);
                }
                if (y != null) {
                    GC_data[elm]["context"].moveTo(0, y);
                    GC_data[elm]["context"].lineTo(elm.width, y);
                }
                if (dx != null) {
                    GC_data[elm]["context"].moveTo(dx, 0);
                    GC_data[elm]["context"].lineTo(dx, elm.height);
                }
                if (dy != null) {
                    GC_data[elm]["context"].moveTo(0, dy);
                    GC_data[elm]["context"].lineTo(elm.width, dy);
                }
                GC_data[elm]["context"].fill();
                GC_data[elm]["context"].stroke();
                GC_data[elm]["context"].strokeStyle = bu_strokeStyle;
                GC_data[elm]["context"].fillStyle = bu_fillStyle;
                GC_data[elm]["context"].lineWidth = bu_lineWidth;
                GC_data[elm]["context"].setLineDash([]);
            }
        }
    }
    function draw_text(elm, x, y, text, color, size, line_color, line_size, font, pattern, textAlign, direction, style = "", LetterSpacing) {
        GC_data[elm]["context"].beginPath();
        set_pattern_and_color(elm, pattern, [color, line_color]);
        let pos = get_position(elm, x, y, null, null, line_size, size);
        GC_data[elm]["context"].font = `${style} ${pos.size}pt ${font}`;
        GC_data[elm]["context"].textAlign = textAlign;
        GC_data[elm]["context"].letterSpacing = LetterSpacing;
        let measure = GC_data[elm]["context"].measureText(text);
        set_translate(elm, pos.x - measure.actualBoundingBoxLeft, pos.y - measure.actualBoundingBoxAscent, (pos.x - measure.actualBoundingBoxLeft) + (GC_data[elm]["context"].measureText(text).width), pos.y + (measure.actualBoundingBoxDescent), "text");
        GC_data[elm]["context"].lineWidth = pos.line_size;
        GC_data[elm]["context"].direction = direction;
        GC_data[elm]["context"].strokeText(text, pos.x, pos.y);
        GC_data[elm]["context"].fillText(text, pos.x, pos.y);
        GC_data[elm]["context"].stroke();
        GC_data[elm]["context"].restore();
        return (-measure.actualBoundingBoxLeft) + (GC_data[elm]["context"].measureText(text).width);
    }
    function get_text_range(elm, x, y, text, color, size, line_color, line_size, font, pattern, textAlign, direction, style = "", LetterSpacing) {
        let pos = get_position(elm, x, y, null, null, line_size, size);
        GC_data[elm]["context"].font = `${style} ${pos.size}pt ${font}`;
        GC_data[elm]["context"].textAlign = textAlign;
        GC_data[elm]["context"].letterSpacing = LetterSpacing;
        let measure = GC_data[elm]["context"].measureText(text);
        return { measure: measure, x: pos.x - measure.actualBoundingBoxLeft, y: pos.y - measure.actualBoundingBoxAscent, dx: (pos.x - measure.actualBoundingBoxLeft) + (GC_data[elm]["context"].measureText(text).width), dy: pos.y + (measure.actualBoundingBoxDescent) };
    }
    if (selector == null) {
        selector = "canvas";
    }
    const elm = document.querySelectorAll(selector);
    return {
        elm,
        size: GC_size[elm[0]],
        url: function () { return elm[0].toDataURL("image/jpeg") },
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
                    } else if (quality == "lunatic") {
                        quality = 100;
                    } else if (Number(quality) > 0) {
                        quality = Number(quality);
                    } else {
                        quality = 1;
                    }
                    if (GC_size[elm].width * quality > 32767) {
                        quality = Math.floor(32767 / GC_size[elm].width);
                    }
                    if (GC_size[elm].height * quality > 32767) {
                        quality = Math.floor(32767 / GC_size[elm].height);
                    }
                    if (((GC_size[elm].height * quality) * (GC_size[elm].width * quality)) > 268435456) {
                        quality = Math.floor(16384 / Math.max(GC_size[elm].width, GC_size[elm].height));
                    }
                    elm.width = GC_size[elm].width * quality;
                    elm.height = GC_size[elm].height * quality;
                    elm.style.width = (`${GC_size[elm].width}px`);
                    elm.style.height = (`${GC_size[elm].height}px`);
                    GC_data[elm]["quality"] = quality;
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
            },
            debug: function (true_false, color = null, size = null, dash = null) {
                elm.forEach(elm => {
                    GC_data[elm]["debug"] = {};
                    GC_data[elm]["debug"]["T_F"] = true_false;
                    GC_data[elm]["debug"]["color"] = color;
                    GC_data[elm]["debug"]["size"] = size;
                    GC_data[elm]["debug"]["dash"] = dash;
                })
            }
        },
        draw: {
            box: function (x, y, width, height, fill_color, line_color, line_size, pattern) {
                elm.forEach(elm => {
                    GC_data[elm]["context"].beginPath();
                    set_pattern_and_color(elm, pattern, [fill_color, line_color]);
                    let pos = get_position(elm, x, y, width, height, line_size);
                    set_translate(elm, pos.x, pos.y, pos.dx, pos.dy);
                    GC_data[elm]["context"].rect(pos.x, pos.y, pos.dx, pos.dy);
                    GC_data[elm]["context"].lineWidth = pos.line_size;
                    GC_data[elm]["context"].fill();
                    GC_data[elm]["context"].stroke();
                    GC_data[elm]["context"].restore();
                })
            },
            line: function (x, y, dx, dy, color, size, pattern, aft_pos = [], LineDash = []) {
                elm.forEach(elm => {
                    GC_data[elm]["context"].beginPath();
                    set_pattern_and_color(elm, pattern, [null, color]);
                    let pos = get_position(elm, x, y, dx, dy, null, size);
                    set_translate(elm, pos.x, pos.y, pos.dx, pos.dy);
                    GC_data[elm]["context"].lineWidth = pos.size;
                    for (let i = 0; i < LineDash.length; i++) {
                        LineDash[i] = transform_position(elm, null, null, LineDash[i]).size;
                    }
                    GC_data[elm]["context"].setLineDash(LineDash);
                    GC_data[elm]["context"].moveTo(pos.x, pos.y);
                    GC_data[elm]["context"].lineTo(pos.dx, pos.dy);
                    for (let i = 0; i < aft_pos.length; i++) {
                        let pos = get_position(elm, aft_pos[i], aft_pos[i], null, null, null, size);
                        GC_data[elm]["context"].lineTo(pos.x, pos.y);
                    }
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
            image: function (img_url, x, y, width, height, pattern, function_name = null) {
                elm.forEach(elm => {
                    if (GC_data["image"][img_url] == null) {
                        GC_data["image"][img_url] = new Image();
                        GC_data["image"][img_url].src = img_url;
                        GC_data["is_loaded_image"][img_url] = false;
                    }
                    if (GC_data["is_loaded_image"][img_url]) {
                        set_pattern_and_color(elm, pattern, [null, null]);
                        let pos = get_position(elm, x, y, width, height, null, null);
                        set_translate(elm, pos.x, pos.y, pos.dx, pos.dy);
                        GC_data[elm]["context"].beginPath();
                        GC_data[elm]["context"].drawImage(GC_data["image"][img_url], pos.x, pos.y, pos.dx, pos.dy);
                        GC_data[elm]["context"].stroke();
                        GC_data[elm]["context"].restore();
                        if (function_name != null) {
                            requestAnimationFrame(function_name);
                        }
                    } else {
                        GC_data["image"][img_url].onload = () => {
                            GC_data["is_loaded_image"][img_url] = true;
                            set_pattern_and_color(elm, pattern, [null, null]);
                            let pos = get_position(elm, x, y, width, height, null, null);
                            set_translate(elm, pos.x, pos.y, pos.dx, pos.dy);
                            GC_data[elm]["context"].beginPath();
                            GC_data[elm]["context"].drawImage(GC_data["image"][img_url], pos.x, pos.y, pos.dx, pos.dy);
                            GC_data[elm]["context"].stroke();
                            GC_data[elm]["context"].restore();
                            if (function_name != null) {
                                requestAnimationFrame(function_name);
                            }
                        }
                    }
                })
            },
            //サポート外
            image_Old: function (img_url, x, y, size, keep_the_original = false, pattern, function_name = null) {
                elm.forEach(elm => {
                    if (GC_data["image"][img_url] == null) {
                        GC_data["image"][img_url] = new Image();
                        GC_data["image"][img_url].src = img_url;
                    }
                    GC_data["image"][img_url].onload = () => {
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
                        if (function_name != null) {
                            requestAnimationFrame(function_name);
                        }
                    }
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
            text: function (x, y, text, color, size, line_color, line_size, font, pattern, textAlign, direction, style = "", Turn_around = Infinity, Line_spacing = 0, LetterSpacing = 0, lineAlign = "top") {
                elm.forEach(elm => {
                    let de_text = String(String(String(text).split("<?")).split("</>")).split(",");
                    let lasted_position = 0;
                    let Ly = 0;
                    for (let i = 0; i < de_text.length; i++) {
                        let temp_size = size;
                        if (Number(de_text[i].split(">")[0]) > 0 && de_text[i].indexOf(">") != -1) {
                            temp_size = Number(de_text[i].split(">")[0]);
                            de_text[i] = de_text[i].split(">")[1];
                        }
                        let Confirm_text = [];
                        let ni = 0;
                        if (Turn_around != Infinity) {
                            for (let g = 0; g < de_text[i].length; g++) {
                                if (Un_transform_position(elm, get_text_range(elm, x, y, de_text[i].slice(ni, g), color, temp_size, line_color, line_size, font, pattern, textAlign, direction, style, LetterSpacing).dx, null, null).x > Turn_around || g == (de_text[i].length - 1)) {
                                    let show_text = de_text[i].slice(ni, g);
                                    if (g == (de_text[i].length - 1)) {
                                        show_text = de_text[i].slice(ni);
                                    }
                                    let left = Un_transform_position(elm, get_text_range(elm, x, y, show_text, color, temp_size, line_color, line_size, font, pattern, textAlign, direction, style, LetterSpacing).x, null, null).x;
                                    let right = Un_transform_position(elm, get_text_range(elm, x, y, show_text, color, temp_size, line_color, line_size, font, pattern, textAlign, direction, style, LetterSpacing).dx, null, null).x;
                                    let width = right - left;
                                    let top = Un_transform_position(elm, null, get_text_range(elm, x, y, show_text, color, temp_size, line_color, line_size, font, pattern, textAlign, direction, style, LetterSpacing).y, null).y;
                                    let bottom = Un_transform_position(elm, null, get_text_range(elm, x, y, show_text, color, temp_size, line_color, line_size, font, pattern, textAlign, direction, style, LetterSpacing).dy, null).y;
                                    let height = bottom - top;
                                    Confirm_text.push({ text: show_text, width: width, dy: height });
                                    ni = g;
                                }
                            }
                        } else {
                            Confirm_text = [{ text: de_text[i], dy: 0 }];
                        }
                        let temp_num = 0;
                        let RI_af = 0;
                        if (lineAlign == "center") {
                            if (Confirm_text.length > 1) {
                                for (let i = 0; i < Confirm_text.length; i++) {
                                    RI_af += Confirm_text[i].dy;
                                }
                                RI_af = RI_af / (Confirm_text.length + 1);
                            }
                        }
                        for (let i = 0; i < Confirm_text.length; i++) {
                            temp_num = Un_transform_position(elm, draw_text(elm, x + lasted_position, (y + ((Confirm_text[i].dy + Ly) * i) - RI_af), Confirm_text[i].text, color, temp_size, line_color, line_size, font, pattern, textAlign, direction, style, LetterSpacing), null, null).x;
                            Ly = Line_spacing;
                        }
                        lasted_position += temp_num;
                    }
                })
            }
        },
        start: function (type) {
            elm.forEach(elm => {
                if (GC_data[elm] == null) {
                    GC_data[elm] = {};
                    GC_data[elm]["quality"] = "normal";
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
        clear: function (x, y, width, height) {
            elm.forEach(elm => {
                let pos = get_position(elm, x, y, width, height);
                set_translate(elm, x, y, width, height);
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
        Get: {
            color: function (x, y, width, height) {
                let res = [];
                elm.forEach(elm => {
                    let pos = transform_position(elm, x, y);
                    let pos2 = transform_position(elm, width, height);
                    res.push(GC_data[elm]["context"].getImageData(pos.x, pos.y, pos2.x, pos2.y).data);
                });
                return res;
            }
        },
        GetEvent: {
            click: function (function_name) {
                elm.forEach(elm => {
                    elm.addEventListener("click", function (e) {
                        var clientRect = elm.getBoundingClientRect();
                        let pos = Un_transform_position(elm, e.clientX - clientRect.left, e.clientY - clientRect.top);
                        setTimeout(function_name, 0, pos.x, pos.y);
                    })
                })
            },
            menu: function (function_name) {
                elm.forEach(elm => {
                    elm.addEventListener("contextmenu", function (e) {
                        var clientRect = elm.getBoundingClientRect();
                        let pos = Un_transform_position(elm, e.clientX - clientRect.left, e.clientY - clientRect.top);
                        setTimeout(function_name, 0, pos.x, pos.y);
                    })
                })
            },
            move: function (function_name) {
                elm.forEach(elm => {
                    elm.addEventListener("touchmove", function (e) {
                        var clientRect = elm.getBoundingClientRect();
                        let pos = Un_transform_position(elm, e.touches[0].pageX - clientRect.left, e.touches[0].pageY - clientRect.top);
                        setTimeout(function_name, 0, pos.x, pos.y);
                    })
                    elm.addEventListener("mousemove", function (e) {
                        var clientRect = elm.getBoundingClientRect();
                        let pos = Un_transform_position(elm, e.clientX - clientRect.left, e.clientY - clientRect.top);
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
                        let pos1 = Un_transform_position(elm, (e.touches[0].pageX - clientRect.left), (e.touches[0].pageY - clientRect.top));
                        GC_data.clicking_judge_box_position_2[i] = ([pos1.x, pos1.y]);
                        GC_data.clicking_judge_box_position[i] = ([pos1.x, pos1.y]);
                        GC_data.clicking_judge_box[i] = true;
                    })
                    elm.addEventListener("mousedown", function (e) {
                        var clientRect = elm.getBoundingClientRect();
                        let pos1 = Un_transform_position(elm, e.clientX - clientRect.left, e.clientY - clientRect.top);
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
                            let pos1 = Un_transform_position(elm, e.touches[0].pageX - clientRect.left, e.touches[0].pageY - clientRect.top);
                            GC_data.clicking_judge_box_position[i] = ([pos1.x, pos1.y]);
                        }
                    })
                    elm.addEventListener("mousemove", function (e) {
                        if (GC_data.clicking_judge_box[i]) {
                            var clientRect = elm.getBoundingClientRect();
                            let pos1 = Un_transform_position(top, e.clientX - clientRect.left, e.clientY - clientRect.top);
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
        },
        object: {
            create: function (name, x, y, direction) {
                GC_data["object"][name] = {};
                GC_data["object"][name]["x"] = x;
                GC_data["object"][name]["y"] = y;
                GC_data["object"][name]["dir"] = direction - 90;
            },
            delete: function (name) {
                delete GC_data["object"][name];
            },
            move: function (name, distance) {
                GC_data["object"][name]["x"] += Math.cos(GC_data["object"][name]["dir"] * (Math.PI / 180)) * distance;
                GC_data["object"][name]["y"] += Math.sin(GC_data["object"][name]["dir"] * (Math.PI / 180)) * distance;
            },
            set: function (name, x, y, direction) {
                if (x != null) {
                    GC_data["object"][name]["x"] = x;
                }
                if (y != null) {
                    GC_data["object"][name]["y"] = y;
                }
                if (direction != null) {
                    GC_data["object"][name]["dir"] = direction - 90;
                }
            },
            value: function (name, key, value) {
                GC_data["object"][name][key] = value;
            },
            get: function (name) {
                return GC_data["object"][name];
            },
            is_touch_edge: function (name, margin) {
                let pos = transform_position(elm[0], GC_data["object"][name].x, GC_data["object"][name].y, margin);
                let is_touch = false;
                if ((pos.x - pos.size) > elm[0].width || pos.x + pos.size < 0 || pos.y - pos.size > elm[0].height || pos.y + pos.size < 0) {
                    is_touch = true;
                } else {
                    is_touch = false;
                }
                return is_touch;
            }
        },
        Document_GetEvent: {
            key: () => { return GC_data["input_key"] },
        }
    }
}

var GC_music_data = {

}
let GC_music_cash = [

];

function GC_playsound(sound_file_name, volume, name, startTime) {
    function isPlaying(audio) {
        return !audio.paused;
    }

    let is_foakwop = false;

    for (let i = 0; i < GC_music_cash.length; i++) {
        if (GC_music_cash[i].name == sound_file_name) {
            if (!isPlaying(GC_music_cash[i].audio)) {
                GC_music_cash[i].audio.currentTime = startTime || 0; // デフォルトは0秒から再生
                GC_music_cash[i].audio.play();
                GC_music_cash[i].audio.volume = (volume / 100);
                is_foakwop = true;
                break;
            }
        }
    }

    if (!is_foakwop) {
        GC_music_data[`${name}`] = new Audio();
        GC_music_data[name].preload = "auto";
        GC_music_data[name].src = sound_file_name;
        GC_music_data[name].load();
        GC_music_data[name].currentTime = startTime || 0; // デフォルトは0秒から再生
        GC_music_data[name].play();
        GC_music_data[name].volume = (volume / 100);
        GC_music_cash.push({ name: sound_file_name, audio: GC_music_data[name] });
    }
}

function GC_volume_sound(volume, name) {
    GC_music_data[name].volume = (volume / 100);
}
function GC_stopsound(name) {
    GC_music_data[name].load();
    GC_music_data[name].pause();
}

function GC_get_sound_info(name) {
    let data = {
        duration: GC_music_data[name].duration,
        currentTime: GC_music_data[name].currentTime
    }
    return data;
}

document.addEventListener("keydown", function (e) {
    if (GC_data["input_key"].indexOf(e.key) == -1) {
        GC_data["input_key"].push(e.key);
    }
})

document.addEventListener("keyup", function (e) {
    for (let i = 0; i < GC_data["input_key"].length; i++) {
        if (GC_data["input_key"][i] == e.key) {
            GC_data["input_key"].splice(i, 1);
            i--;
        }
    }
})