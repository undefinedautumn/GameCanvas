const GC_size = {};
const GC_data = {
    bag_num: 0,
    s_r_history: [],
    image: {},
    is_loaded_image: {},
    clicking_judge_box_position: [],
    clicking_judge_box_position_2: [],
    clicking_judge_box: [],
    clicking_judge_i: 0,
    object: {},
    input_key: [],
    music_data: {

    },
    music_cash: [],
    loop: {},
    before_process: [],
    prayer: {
        width_time: 1,
        height_time: 1,
        x: 0,
        y: 0,
    },
    loop_trigger: {

    },
    before_selector: null,
    now_select_UUID: null,
}

const GC = (selector) => {
    const elm = (selector != null) ? document.querySelector(selector) : null;
    if (selector == null) {
        if (GC_data.before_selector != null) {
            selector = GC_data.before_selector;
        } else {
            selector = "canvas";
        }
    } else {
        GC_data.before_selector = selector;
        if (elm.getAttribute("GC_UUID") == null) {
            elm.setAttribute("GC_UUID", 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            }));
        }
        GC_data.now_select_UUID = elm.getAttribute("GC_UUID");
    }
    const EC_id = GC_data.now_select_UUID;
    if (GC_data.s_r_history.length > 1000) {
        GC_data.s_r_history.splice(0, Math.max(GC_data.s_r_history.length - 1000, 0));
    }
    function set_pattern_and_color(pattern, colors) {
        if (colors == null) {
            colors = [];
        }
        if (colors[0] == null) {
            colors[0] = ("rgba(0,0,0,0)");
        }
        if (colors[1] == null) {
            colors[1] = ("rgba(0,0,0,0)");
        }
        GC_data[EC_id]["context"].fillStyle = colors[0];
        GC_data[EC_id]["context"].strokeStyle = colors[1];
        if (pattern == "front") {
            GC_data[EC_id]["context"].globalCompositeOperation = ("source-over");
        } else if (pattern == "back") {
            GC_data[EC_id]["context"].globalCompositeOperation = ("destination-over");
        } else if (pattern == "delete") {
            GC_data[EC_id]["context"].globalCompositeOperation = ("copy");
        } else if (pattern == "over") {
            GC_data[EC_id]["context"].globalCompositeOperation = ("lighter");
        } else if (pattern == "xor") {
            GC_data[EC_id]["context"].globalCompositeOperation = ("xor");
        } else if (pattern == "cut") {
            GC_data[EC_id]["context"].globalCompositeOperation = ("destination-out");
        } else if (pattern == "trimming") {
            GC_data[EC_id]["context"].globalCompositeOperation = ("destination-in");
        }
    }
    function get_position(x = 0, y = 0, dx = 0, dy = 0, line_size = 0, size = 0) {
        let return_pos = {};
        x = x * GC_data["prayer"]["width_time"] + GC_data["prayer"]["x"];
        y = y * GC_data["prayer"]["height_time"] + GC_data["prayer"]["y"];
        dx = dx * GC_data["prayer"]["width_time"];
        dy = dy * GC_data["prayer"]["height_time"];
        line_size *= (GC_data["prayer"]["width_time"] + GC_data["prayer"]["height_time"]) / 2;
        size *= (GC_data["prayer"]["width_time"] + GC_data["prayer"]["height_time"]) / 2;
        if (GC_data[EC_id]["Calculation_method"] == "px") {
            return_pos["x"] = x * GC_data[EC_id]["quality"];
            return_pos["y"] = y * GC_data[EC_id]["quality"];
            return_pos["dx"] = dx * GC_data[EC_id]["quality"];
            return_pos["dy"] = dy * GC_data[EC_id]["quality"];
            return_pos["line_size"] = line_size * GC_data[EC_id]["quality"];
            return_pos["size"] = size * GC_data[EC_id]["quality"];
        } else if (GC_data[EC_id]["Calculation_method"] == "percent") {
            return_pos["x"] = GC_data[EC_id].elm.width / 100 * x;
            return_pos["y"] = GC_data[EC_id].elm.height / 100 * y;
            return_pos["dx"] = GC_data[EC_id].elm.width / 100 * dx;
            return_pos["dy"] = GC_data[EC_id].elm.height / 100 * dy;
            return_pos["line_size"] = ((GC_data[EC_id].elm.height + GC_data[EC_id].elm.width) / 200) * line_size;
            return_pos["size"] = ((GC_data[EC_id].elm.height + GC_data[EC_id].elm.width) / 200) * size;
        } else if (GC_data[EC_id]["Calculation_method"] == "vmin") {
            return_pos["x"] = Math.min(GC_data[EC_id].elm.width, GC_data[EC_id].elm.height) / 100 * x;
            return_pos["y"] = Math.min(GC_data[EC_id].elm.width, GC_data[EC_id].elm.height) / 100 * y;
            return_pos["dx"] = Math.min(GC_data[EC_id].elm.width, GC_data[EC_id].elm.height) / 100 * dx;
            return_pos["dy"] = Math.min(GC_data[EC_id].elm.width, GC_data[EC_id].elm.height) / 100 * dy;
            return_pos["line_size"] = Math.min(GC_data[EC_id].elm.width, GC_data[EC_id].elm.height) / 100 * line_size;
            return_pos["size"] = Math.min(GC_data[EC_id].elm.width, GC_data[EC_id].elm.height) / 100 * size;
        } else if (GC_data[EC_id]["Calculation_method"] == "vmax") {
            return_pos["x"] = Math.max(GC_data[EC_id].elm.width, GC_data[EC_id].elm.height) / 100 * x;
            return_pos["y"] = Math.max(GC_data[EC_id].elm.width, GC_data[EC_id].elm.height) / 100 * y;
            return_pos["dx"] = Math.max(GC_data[EC_id].elm.width, GC_data[EC_id].elm.height) / 100 * dx;
            return_pos["dy"] = Math.max(GC_data[EC_id].elm.width, GC_data[EC_id].elm.height) / 100 * dy;
            return_pos["line_size"] = Math.max(GC_data[EC_id].elm.width, GC_data[EC_id].elm.height) / 100 * line_size;
            return_pos["size"] = Math.max(GC_data[EC_id].elm.width, GC_data[EC_id].elm.height) / 100 * size;
        };
        return return_pos;
    }
    function transform_position(x = 0, y = 0, size = 0) {
        let return_pos = {};
        x = x * GC_data["prayer"]["width_time"] + GC_data["prayer"]["x"];
        y = y * GC_data["prayer"]["height_time"] + GC_data["prayer"]["y"];
        size *= (GC_data["prayer"]["width_time"] + GC_data["prayer"]["height_time"]) / 2;
        if (GC_data[EC_id]["Calculation_method"] == "px") {
            return_pos["x"] = x * GC_data[EC_id]["quality"];
            return_pos["y"] = y * GC_data[EC_id]["quality"];
            return_pos["size"] = size * GC_data[EC_id]["quality"];
        } else if (GC_data[EC_id]["Calculation_method"] == "percent") {
            return_pos["x"] = GC_size[EC_id].width / 100 * x;
            return_pos["y"] = GC_size[EC_id].height / 100 * y;
            return_pos["size"] = (GC_size[EC_id].width + GC_size[EC_id].height) / 200 * size;
        } else if (GC_data[EC_id]["Calculation_method"] == "vmin") {
            return_pos["x"] = Math.min(GC_size[EC_id].width, GC_size[EC_id].height) / 100 * x;
            return_pos["y"] = Math.min(GC_size[EC_id].width, GC_size[EC_id].height) / 100 * y;
            return_pos["size"] = Math.min(GC_size[EC_id].width, GC_size[EC_id].height) / 100 * size;
        } else if (GC_data[EC_id]["Calculation_method"] == "vmax") {
            return_pos["x"] = Math.max(GC_size[EC_id].width, GC_size[EC_id].height) / 100 * x;
            return_pos["y"] = Math.max(GC_size[EC_id].width, GC_size[EC_id].height) / 100 * y;
            return_pos["size"] = Math.max(GC_size[EC_id].width, GC_size[EC_id].height) / 100 * size;
        };
        return return_pos;
    }
    function Un_transform_position(x = 0, y = 0, size = 0) {
        let return_pos = {};
        if (GC_data[EC_id]["Calculation_method"] == "px") {
            return_pos["x"] = x / GC_data[EC_id]["quality"];
            return_pos["y"] = y / GC_data[EC_id]["quality"];
            return_pos["size"] = size / GC_data[EC_id]["quality"];
        } else if (GC_data[EC_id]["Calculation_method"] == "percent") {
            return_pos["x"] = x / GC_size[EC_id].width * 100;
            return_pos["y"] = y / GC_size[EC_id].height * 100;
            return_pos["size"] = size / (GC_size[EC_id].width + GC_size[EC_id].height) * 200;
        } else if (GC_data[EC_id]["Calculation_method"] == "vmin") {
            return_pos["x"] = x / Math.min(GC_size[EC_id].width, GC_size[EC_id].height) * 100;
            return_pos["y"] = y / Math.min(GC_size[EC_id].width, GC_size[EC_id].height) * 100;
            return_pos["size"] = size / Math.min(GC_size[EC_id].width, GC_size[EC_id].height) * 100;
        } else if (GC_data[EC_id]["Calculation_method"] == "vmax") {
            return_pos["x"] = x / Math.max(GC_size[EC_id].width, GC_size[EC_id].height) * 100;
            return_pos["y"] = y / Math.max(GC_size[EC_id].width, GC_size[EC_id].height) * 100;
            return_pos["size"] = size / Math.max(GC_size[EC_id].width, GC_size[EC_id].height) * 100;
        };
        return return_pos;
    }
    function set_translate(x, y, dx, dy, x3, y3) {
        GC_data.bag_num++;
        GC_data[EC_id]["context"].save();
        let coordinates = GC_data[EC_id]["coordinates"];
        let Misalignment_pos = null;
        if ((Math.max(x, dx, x3) > 100 || Math.max(y, dy, y3) > 100 || Math.min(x, dx, x3) < 0 || Math.min(y, dy, y3) < 0) && GC_data[EC_id]["optimization"] >= 1) {
            GC_data[EC_id]["context"].restore();
            GC_data.bag_num--;
            return "break";
        }
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
            GC_data[EC_id]["context"].translate(Misalignment_pos[0], Misalignment_pos[1]);
            if (GC_data[EC_id]["context_data"] != null) {
                GC_data[EC_id]["context"].scale(GC_data[EC_id]["context_data"]["scale"][0], GC_data[EC_id]["context_data"]["scale"][1]);
                GC_data[EC_id]["context"].rotate(GC_data[EC_id]["context_data"]["rotate"]);
                GC_data[EC_id]["context"].shadowBlur = GC_data[EC_id]["context_data"]["shadowBlur"];
                GC_data[EC_id]["context"].shadowColor = GC_data[EC_id]["context_data"]["shadowColor"];
                GC_data[EC_id]["context"].shadowOffsetX = GC_data[EC_id]["context_data"]["shadowOffsetX"];
                GC_data[EC_id]["context"].shadowOffsetY = GC_data[EC_id]["context_data"]["shadowOffsetY"];
                if (GC_data[EC_id]["context_data"]["Gradient"] != null) {
                    if (GC_data[EC_id]["context_data"]["Gradient"]["type"] == "Conic") {
                        let pos = transform_position(GC_data[EC_id]["context_data"]["Gradient"]["method"][1], GC_data[EC_id]["context_data"]["Gradient"]["method"][2]);
                        const gradient = GC_data[EC_id]["context"].createConicGradient(GC_data[EC_id]["context_data"]["Gradient"]["method"][0], pos.x, pos.y);
                        for (const key in GC_data[EC_id]["context_data"]["Gradient"]["value_and_color"]) {
                            if (Object.prototype.hasOwnProperty.call(GC_data[EC_id]["context_data"]["Gradient"]["value_and_color"], key)) {
                                const element = GC_data[EC_id]["context_data"]["Gradient"]["value_and_color"][key];
                                gradient.addColorStop(key, element);
                            }
                        }
                        GC_data[EC_id]["context"].fillStyle = gradient;
                    } else if (GC_data[EC_id]["context_data"]["Gradient"]["type"] == "Linear") {
                        let pos = transform_position(GC_data[EC_id]["context_data"]["Gradient"]["method"][0], GC_data[EC_id]["context_data"]["Gradient"]["method"][1]);
                        let pos2 = transform_position(GC_data[EC_id]["context_data"]["Gradient"]["method"][2], GC_data[EC_id]["context_data"]["Gradient"]["method"][3]);
                        const gradient = GC_data[EC_id]["context"].createLinearGradient(pos.x, pos.y, pos2.x, pos2.y);
                        for (const key in GC_data[EC_id]["context_data"]["Gradient"]["value_and_color"]) {
                            if (Object.prototype.hasOwnProperty.call(GC_data[EC_id]["context_data"]["Gradient"]["value_and_color"], key)) {
                                const element = GC_data[EC_id]["context_data"]["Gradient"]["value_and_color"][key];
                                gradient.addColorStop(key, element);
                            }
                        }
                        GC_data[EC_id]["context"].fillStyle = gradient;
                    } else if (GC_data[EC_id]["context_data"]["Gradient"]["type"] == "Radial") {
                        let pos = transform_position(GC_data[EC_id]["context_data"]["Gradient"]["method"][0], GC_data[EC_id]["context_data"]["Gradient"]["method"][1]);
                        let pos2 = transform_position(GC_data[EC_id]["context_data"]["Gradient"]["method"][3], GC_data[EC_id]["context_data"]["Gradient"]["method"][4]);
                        const gradient = GC_data[EC_id]["context"].createRadialGradient(pos.x, pos.y, GC_data[EC_id]["context_data"]["Gradient"]["method"][2], pos2.x, pos2.y, GC_data[EC_id]["context_data"]["Gradient"]["method"][5]);
                        for (const key in GC_data[EC_id]["context_data"]["Gradient"]["value_and_color"]) {
                            if (Object.prototype.hasOwnProperty.call(GC_data[EC_id]["context_data"]["Gradient"]["value_and_color"], key)) {
                                const element = GC_data[EC_id]["context_data"]["Gradient"]["value_and_color"][key];
                                gradient.addColorStop(key, element);
                            }
                        }
                        GC_data[EC_id]["context"].fillStyle = gradient;
                    }
                }
            }
            GC_data[EC_id]["context"].translate(-Misalignment_pos[0], -Misalignment_pos[1]);
        }
        if (GC_data[EC_id]["debug"] != null) {
            if (GC_data[EC_id]["debug"]["T_F"]) {
                let bu_strokeStyle = GC_data[EC_id]["context"].strokeStyle;
                let bu_lineWidth = GC_data[EC_id]["context"].lineWidth;
                let bu_fillStyle = GC_data[EC_id]["context"].fillStyle;
                GC_data[EC_id]["context"].beginPath();
                GC_data[EC_id]["context"].strokeStyle = ("rgba(0,255,0,0.25)");
                GC_data[EC_id]["context"].fillStyle = ("rgba(0,255,0,0.25)");
                GC_data[EC_id]["context"].lineWidth = 10;
                GC_data[EC_id]["context"].setLineDash([]);
                if (GC_data[EC_id]["debug"]["size"] != null) {
                    GC_data[EC_id]["context"].lineWidth = GC_data[EC_id]["debug"]["size"];
                }
                if (GC_data[EC_id]["debug"]["color"] != null) {
                    GC_data[EC_id]["context"].strokeStyle = GC_data[EC_id]["debug"]["color"];
                }
                if (GC_data[EC_id]["debug"]["color"] != null) {
                    GC_data[EC_id]["context"].fillStyle = GC_data[EC_id]["debug"]["color"];
                }
                if (GC_data[EC_id]["debug"]["dash"] != null) {
                    GC_data[EC_id]["context"].setLineDash(GC_data[EC_id]["debug"]["dash"]);
                }
                if (x3 != "wind" && x3 != "absolute" && dx != "size" && x3 != "text") {
                    dx += x;
                    dy += y;
                } else if (x3 == "wind" || dx == "size") {
                    x -= dy;
                    y -= dy;
                    dx = x + (dy * 2);
                    dy = y + (dy * 2);
                }
                if (x != null) {
                    GC_data[EC_id]["context"].moveTo(x, 0);
                    GC_data[EC_id]["context"].lineTo(x, GC_size[EC_id].height);
                }
                if (y != null) {
                    GC_data[EC_id]["context"].moveTo(0, y);
                    GC_data[EC_id]["context"].lineTo(GC_size[EC_id].width, y);
                }
                if (dx != null) {
                    GC_data[EC_id]["context"].moveTo(dx, 0);
                    GC_data[EC_id]["context"].lineTo(dx, GC_size[EC_id].height);
                }
                if (dy != null) {
                    GC_data[EC_id]["context"].moveTo(0, dy);
                    GC_data[EC_id]["context"].lineTo(GC_size[EC_id].width, dy);
                }
                GC_data[EC_id]["context"].moveTo(0, 0);
                GC_data[EC_id]["context"].fill();
                GC_data[EC_id]["context"].stroke();
                GC_data[EC_id]["context"].strokeStyle = bu_strokeStyle;
                GC_data[EC_id]["context"].fillStyle = bu_fillStyle;
                GC_data[EC_id]["context"].lineWidth = bu_lineWidth;
                GC_data[EC_id]["context"].setLineDash([]);
            }
        }
    }
    function draw_text(x, y, text, color, size, line_color, line_size, font, pattern, textAlign, direction, style = "", LetterSpacing, BaseAlign) {
        GC_data[EC_id]["context"].beginPath();
        set_pattern_and_color(pattern, [color, line_color]);
        let pos = get_position(x, y, null, null, line_size, size);
        GC_data[EC_id]["context"].font = `${style} ${pos.size}pt ${font}`;
        GC_data[EC_id]["context"].textAlign = textAlign;
        GC_data[EC_id]["context"].textBaseline = BaseAlign;
        GC_data[EC_id]["context"].letterSpacing = LetterSpacing;
        let measure = GC_data[EC_id]["context"].measureText(text);
        if (set_translate(pos.x - measure.actualBoundingBoxLeft, pos.y - measure.actualBoundingBoxAscent, (pos.x - measure.actualBoundingBoxLeft) + (GC_data[EC_id]["context"].measureText(text).width), pos.y + (measure.actualBoundingBoxDescent), "text") == "break") {
            return;
        };
        GC_data[EC_id]["context"].lineWidth = pos.line_size;
        GC_data[EC_id]["context"].direction = direction;
        GC_data[EC_id]["context"].strokeText(text, pos.x, pos.y);
        GC_data[EC_id]["context"].fillText(text, pos.x, pos.y);
        GC_data[EC_id]["context"].stroke();
        GC_data[EC_id]["context"].restore();
        GC_data.bag_num--;
        console.log("Position:", pos, "Size:", size, measure);
        return (-measure.actualBoundingBoxLeft) + (GC_data[EC_id]["context"].measureText(text).width);
    }
    function get_text_range(x, y, text, color, size, line_color, line_size, font, pattern, textAlign, direction, style = "", LetterSpacing, BaseAlign) {
        let pos = get_position(x, y, null, null, line_size, size);
        GC_data[EC_id]["context"].font = `${style} ${pos.size}pt ${font}`;
        GC_data[EC_id]["context"].textAlign = textAlign;
        GC_data[EC_id]["context"].textBaseline = BaseAlign;
        GC_data[EC_id]["context"].textAlign = textAlign;
        GC_data[EC_id]["context"].letterSpacing = LetterSpacing;
        let measure = GC_data[EC_id]["context"].measureText(text);
        return { measure: measure, x: pos.x - measure.actualBoundingBoxLeft, y: pos.y - measure.actualBoundingBoxAscent, dx: (pos.x - measure.actualBoundingBoxLeft) + (GC_data[EC_id]["context"].measureText(text).width), dy: pos.y + (measure.actualBoundingBoxDescent) };
    }
    return {
        // elm: GC_data[EC_id]["elm"],
        EC_id: EC_id,
        size: GC_size[EC_id],
        set: {
            size: function (width, height) {
                // if (GC_data[EC_id] == null) {
                //     GC_data[EC_id] = {};
                // }
                GC_size[EC_id] = { width: width, height: height };
                GC_data[EC_id].elm.width = GC_size[EC_id].width;
                GC_data[EC_id].elm.height = GC_size[EC_id].height;
            },
            quality: function (quality) {
                // if (GC_data[EC_id] == null) {
                //     GC_data[EC_id] = {};
                // }
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
                if (GC_size[EC_id].width * quality > 32767) {
                    quality = Math.floor(32767 / GC_size[EC_id].width);
                }
                if (GC_size[EC_id].height * quality > 32767) {
                    quality = Math.floor(32767 / GC_size[EC_id].height);
                }
                if (((GC_size[EC_id].height * quality) * (GC_size[EC_id].width * quality)) > 268435456) {
                    quality = Math.floor(16384 / Math.max(GC_size[EC_id].width, GC_size[EC_id].height));
                }
                GC_size[EC_id].width = GC_size[EC_id].width * quality;
                GC_size[EC_id].height = GC_size[EC_id].height * quality;
                GC_data[EC_id].elm.style.width = (`${GC_size[EC_id].width}px`);
                GC_data[EC_id].elm.style.height = (`${GC_size[EC_id].height}px`);
                GC_data[EC_id]["quality"] = quality;
            },
            effect: function (coordinates = null, scale = [1, 1], rotate = 0.0, shadow = { Blur: 0, Color: "rgba(0,0,0,0)", OffsetX: 0, OffsetY: 0 }, Gradient = [{ type: "Conic/Linear/Radial", method: [], value_and_color: [] }]) {
                if (GC_data[EC_id] == null) {
                    GC_data[EC_id] = {};
                }
                GC_data[EC_id]["coordinates"] = coordinates;
                if (scale == null) {
                    scale = [1, 1];
                }
                if (GC_data[EC_id]["context_data"] == null) {
                    GC_data[EC_id]["context_data"] = {};
                }
                GC_data[EC_id]["context_data"]["scale"] = [scale[0], scale[1]];
                GC_data[EC_id]["context_data"]["rotate"] = (rotate * Math.PI / 180);
                GC_data[EC_id]["context_data"]["shadowBlur"] = shadow.Blur;
                GC_data[EC_id]["context_data"]["shadowColor"] = shadow.Color;
                GC_data[EC_id]["context_data"]["shadowOffsetX"] = shadow.OffsetX;
                GC_data[EC_id]["context_data"]["shadowOffsetY"] = shadow.OffsetY;
                GC_data[EC_id]["context_data"]["Gradient"] = Gradient;
            },
            debug: function (true_false, color = null, size = null, dash = null) {
                GC_data[EC_id]["debug"] = {};
                GC_data[EC_id]["debug"]["T_F"] = true_false;
                GC_data[EC_id]["debug"]["color"] = color;
                GC_data[EC_id]["debug"]["size"] = size;
                GC_data[EC_id]["debug"]["dash"] = dash;
            }
        },
        draw: {
            box: function (x, y, width, height, fill_color, line_color, line_size, pattern) {
                GC_data[EC_id]["context"].beginPath();
                set_pattern_and_color(pattern, [fill_color, line_color]);
                let pos = get_position(x, y, width, height, line_size);
                GC_data.s_r_history.push("+box");
                set_translate(pos.x, pos.y, pos.dx, pos.dy);
                GC_data[EC_id]["context"].rect(pos.x, pos.y, pos.dx, pos.dy);
                GC_data[EC_id]["context"].lineWidth = pos.line_size;
                GC_data[EC_id]["context"].fill();
                GC_data[EC_id]["context"].stroke();
                GC_data[EC_id]["context"].restore();
                GC_data.s_r_history.push("-box");
                GC_data.bag_num--;
            },
            line: function (x, y, dx, dy, color, size, pattern, aft_pos = [], LineDash = []) {
                GC_data[EC_id]["context"].beginPath();
                set_pattern_and_color(pattern, [null, color]);
                let pos = get_position(x, y, dx, dy, null, size);
                GC_data.s_r_history.push("+line");
                set_translate(pos.x, pos.y, pos.dx, pos.dy);
                GC_data[EC_id]["context"].lineWidth = pos.size;
                for (let i = 0; i < LineDash.length; i++) {
                    LineDash[i] = transform_position(null, null, LineDash[i]).size;
                }
                GC_data[EC_id]["context"].setLineDash(LineDash);
                GC_data[EC_id]["context"].moveTo(pos.x, pos.y);
                GC_data[EC_id]["context"].lineTo(pos.dx, pos.dy);
                for (let i = 0; i < aft_pos.length; i++) {
                    let pos = get_position(aft_pos[i], aft_pos[i], null, null, null, size);
                    GC_data[EC_id]["context"].lineTo(pos.x, pos.y);
                }
                GC_data[EC_id]["context"].fill();
                GC_data[EC_id]["context"].stroke();
                GC_data[EC_id]["context"].restore();
                GC_data.bag_num--;
            },
            bow: function (x, y, rotate, color, size, pattern) {
                const ctx = GC_data[EC_id]["context"];
                const canvasWidth = GC_data[EC_id].GC_size[EC_id].width;
                const canvasHeight = GC_data[EC_id].GC_size[EC_id].height;
                ctx.beginPath();
                GC_data.bag_num++;
                GC_data.s_r_history.push("Plus-bow");
                ctx.save();
                set_pattern_and_color(pattern, [null, color]);
                let pos = get_position(x, y, 0, 0, null, size);
                let ang = rotate * Math.PI / 180;
                ctx.lineWidth = pos.size;
                let rotate_x = Math.cos(ang) * (canvasWidth * 2);
                let rotate_y = Math.sin(ang) * (canvasHeight * 2);
                ctx.moveTo(rotate_x + pos.x, rotate_y + pos.y);
                ctx.lineTo((rotate_x * -1) + pos.x, (rotate_y * -1) + pos.y);
                ctx.fill();
                ctx.stroke();
                ctx.restore();
                GC_data.bag_num--;
                GC_data.s_r_history.push("Minus-bow");
            },
            circle: function (x, y, size, line_size, color, line_color, pattern) {
                GC_data[EC_id]["context"].beginPath();
                set_pattern_and_color(pattern, [color, line_color]);
                let pos = get_position(x, y, null, null, line_size, size);
                GC_data.s_r_history.push("+circle");
                if (set_translate(pos.x, pos.y, "size", pos.size) == "break") {
                    return;
                };
                GC_data[EC_id]["context"].arc(pos.x, pos.y, pos.size, 0 * Math.PI / 180, 360 * Math.PI / 180, false);
                GC_data[EC_id]["context"].lineWidth = pos.line_size;
                GC_data[EC_id]["context"].fill();
                GC_data[EC_id]["context"].stroke();
                GC_data[EC_id]["context"].restore();
                GC_data.bag_num--;
                GC_data.s_r_history.push("-circle");
            },
            circle_outline: function (x, y, size, line_size, startAngle, endAngle, color, pattern) {
                GC_data[EC_id]["context"].beginPath();
                set_pattern_and_color(pattern, [null, color]);
                let pos = get_position(x, y, null, null, line_size, size);
                GC_data.s_r_history.push("+circle_outline");
                set_translate(pos.x, pos.y, "size", pos.size);
                startAngle = startAngle * Math.PI / 180;
                endAngle = endAngle * Math.PI / 180;
                GC_data[EC_id]["context"].lineWidth = pos.line_size;
                GC_data[EC_id]["context"].beginPath();
                GC_data[EC_id]["context"].arc(pos.x, pos.y, pos.size, startAngle, endAngle);
                GC_data[EC_id]["context"].stroke();
                GC_data[EC_id]["context"].restore();
                GC_data.bag_num--;
                GC_data.s_r_history.push("-circle_outline");
            },
            sector: function (x, y, size, line_size, startAngle, endAngle, color, line_color, pattern) {
                GC_data[EC_id]["context"].beginPath();
                set_pattern_and_color(pattern, [color, line_color]);
                let pos = get_position(x, y, null, null, line_size, size);
                GC_data.s_r_history.push("+sector");
                set_translate(pos.x, pos.y, "size", pos.size);
                GC_data[EC_id]["context"].moveTo(pos.x, pos.y);
                GC_data[EC_id]["context"].arc(pos.x, pos.y, pos.size, startAngle * Math.PI / 180, endAngle * Math.PI / 180, false);
                GC_data[EC_id]["context"].lineTo(pos.x, pos.y);
                GC_data[EC_id]["context"].lineWidth = pos.line_size;
                GC_data[EC_id]["context"].fill();
                GC_data[EC_id]["context"].stroke();
                GC_data[EC_id]["context"].restore();
                GC_data.bag_num--;
                GC_data.s_r_history.push("-sector");
            },
            image: function (img_url, x, y, size = { width: null, height: null, size: null, keep_origin: true }, pattern, function_name = null) {
                let width = transform_position(0, 0, size.size).size;
                let height = Number(width);
                if (size.size == null) {
                    width = size.width;
                    height = size.height;
                }
                if (GC_data["image"][img_url] == null) {
                    GC_data["image"][img_url] = new Image();
                    GC_data["image"][img_url].src = img_url;
                    GC_data["is_loaded_image"][img_url] = false;
                }
                if (GC_data["is_loaded_image"][img_url]) {
                    if (size.keep_origin) {
                        if (GC_data["image"][img_url].width > GC_data["image"][img_url].height) {
                            width = height * (GC_size[EC_id].height / GC_size[EC_id].width);
                        } else {
                            height = width * (GC_size[EC_id].width / GC_size[EC_id].height);
                        }
                        x -= (width / 2);
                        y -= (height / 2);
                    }
                    GC_data[EC_id]["context"].beginPath();
                    set_pattern_and_color(pattern, [null, null]);
                    let pos = get_position(x, y, width, height, null, null);
                    GC_data.s_r_history.push("+image");
                    set_translate(pos.x, pos.y, pos.dx, pos.dy);
                    GC_data[EC_id]["context"].drawImage(GC_data["image"][img_url], pos.x, pos.y, pos.dx, pos.dy);
                    GC_data[EC_id]["context"].stroke();
                    GC_data[EC_id]["context"].restore();
                    GC_data.bag_num--;
                    GC_data.s_r_history.push("-image");
                    if (function_name != null) {
                        requestAnimationFrame(function_name);
                    }
                } else {
                    GC_data["image"][img_url].onload = () => {
                        GC_data["is_loaded_image"][img_url] = true;
                        if (size.keep_origin) {
                            if (GC_data["image"][img_url].width > GC_data["image"][img_url].height) {
                                width = height * (GC_size[EC_id].height / GC_size[EC_id].width);
                            } else {
                                height = width * (GC_size[EC_id].width / GC_size[EC_id].height);
                            }
                            x -= (width / 2);
                            y -= (height / 2);
                        }
                        GC_data[EC_id]["context"].beginPath();
                        set_pattern_and_color(pattern, [null, null]);
                        let pos = get_position(x, y, width, height, null, null);
                        GC_data.s_r_history.push("+image");
                        set_translate(pos.x, pos.y, pos.dx, pos.dy);
                        GC_data[EC_id]["context"].drawImage(GC_data["image"][img_url], pos.x, pos.y, pos.dx, pos.dy);
                        GC_data[EC_id]["context"].stroke();
                        GC_data[EC_id]["context"].restore();
                        GC_data.bag_num--;
                        GC_data.s_r_history.push("-image");
                        if (function_name != null) {
                            requestAnimationFrame(function_name);
                        }
                    }
                }
            },
            triangle: function (positions = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0], color, line_color, line_size, pattern) {
                GC_data[EC_id]["context"].beginPath();
                set_pattern_and_color(pattern, [color, line_color]);
                let pos = get_position(positions[0], positions[1], positions[2], positions[3], line_size, null);
                let pos2 = get_position(positions[4], positions[5], null, null, null, null);
                GC_data.s_r_history.push("+triangle");
                set_translate(pos.x, pos.y, pos.dx, pos.dy, pos2.x, pos2.y);
                GC_data[EC_id]["context"].moveTo(pos.x, pos.y);
                GC_data[EC_id]["context"].lineTo(pos.dx, pos.dy);
                GC_data[EC_id]["context"].lineTo(pos2.x, pos2.y);
                GC_data[EC_id]["context"].lineTo(pos.x, pos.y);
                GC_data[EC_id]["context"].lineWidth = pos.line_size;
                GC_data[EC_id]["context"].fill();
                GC_data[EC_id]["context"].stroke();
                GC_data[EC_id]["context"].restore();
                GC_data.bag_num--;
                GC_data.s_r_history.push("-triangle");
            },
            text: function (x, y, text, color, size, line_color, line_size, font, pattern, textAlign, direction, style = "", Turn_around = Infinity, Line_spacing = 0, LetterSpacing = 0, lineAlign = "top", BaseAlign = "alphabetic") {
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
                            if (Un_transform_position(get_text_range(x, y, de_text[i].slice(ni, g), color, temp_size, line_color, line_size, font, pattern, textAlign, direction, style, LetterSpacing, BaseAlign).dx, null, null).x > Turn_around || g == (de_text[i].length - 1)) {
                                let show_text = de_text[i].slice(ni, g);
                                if (g == (de_text[i].length - 1)) {
                                    show_text = de_text[i].slice(ni);
                                }
                                let left = Un_transform_position(get_text_range(x, y, show_text, color, temp_size, line_color, line_size, font, pattern, textAlign, direction, style, LetterSpacing, BaseAlign).x, null, null).x;
                                let right = Un_transform_position(get_text_range(x, y, show_text, color, temp_size, line_color, line_size, font, pattern, textAlign, direction, style, LetterSpacing, BaseAlign).dx, null, null).x;
                                let width = right - left;
                                let top = Un_transform_position(null, get_text_range(x, y, show_text, color, temp_size, line_color, line_size, font, pattern, textAlign, direction, style, LetterSpacing, BaseAlign).y, null).y;
                                let bottom = Un_transform_position(null, get_text_range(x, y, show_text, color, temp_size, line_color, line_size, font, pattern, textAlign, direction, style, LetterSpacing, BaseAlign).dy, null).y;
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
                        temp_num = Un_transform_position(draw_text(x + lasted_position, (y + ((Confirm_text[i].dy + Ly) * i) - RI_af), Confirm_text[i].text, color, temp_size, line_color, line_size, font, pattern, textAlign, direction, style, LetterSpacing, BaseAlign), null, null).x;
                        Ly = Line_spacing;
                    }
                    lasted_position += temp_num;
                }
            }
        },
        start: function (type, optimization = false) {
            if (GC_data[EC_id] == null) {
                GC_data[EC_id] = {};
                GC_data[EC_id]["quality"] = 1;
                let optimization_num = 0;
                if (optimization) {
                    optimization_num = 5;
                }
                GC_data[EC_id]["optimization"] = optimization_num;
                GC_data[EC_id]["elm"] = elm;
            }
            GC_data[EC_id]["context"] = elm.getContext("2d");
            if (GC_data[EC_id]["optimization"] >= 2) {
                GC_data[EC_id]["context"].imageSmoothingEnabled = false;
            }
            if (type == "px" || type == "percent" || type == "vmin" || type == "vmax") {
                GC_data[EC_id]["Calculation_method"] = type;
            } else {
                console.error();
            }
        },
        stop: function () {
            GC_data[EC_id]["context"] = null;
            GC_data[EC_id]["Calculation_method"] = null;
        },
        clear: function (x, y, width, height) {
            let pos = get_position(x, y, width, height);
            GC_data[EC_id]["context"].beginPath();
            GC_data.s_r_history.push("+clear");
            set_translate(x, y, width, height);
            GC_data[EC_id]["context"].clearRect(pos.x, pos.y, pos.dx, pos.dy);
            GC_data[EC_id]["context"].stroke();
            GC_data[EC_id]["context"].restore();
            GC_data.bag_num--;
            GC_data.s_r_history.push("-clear");
            for (const key in GC_data["object"]) {
                if (Object.prototype.hasOwnProperty.call(GC_data["object"], key)) {
                    GC_data["object"][key]["now_draw"] = false;
                }
            }
        },
        loop: {
            start: function (function_name, start_time = 0, set_fps = Infinity) {
                let ID = `${Math.floor(Math.random() * 100000000)}-${Object.keys(GC_data["loop"]).length}`;
                let d = 0;
                let fps = 0;
                let temp_fps = 0;
                let normal_fps = 0;
                let normal_temp_fps = 0;
                GC_data["loop"][ID] = {
                    set_fps: set_fps,
                    stop: false,
                    Fn_time: 0,
                    Ln_time: 0,
                    time_adjustment: start_time,
                };
                const e = setInterval(function () {
                    normal_fps = normal_temp_fps;
                    normal_temp_fps = 0;
                    fps = temp_fps;
                    temp_fps = 0;
                }, 1000)
                let is_first = true;
                function loop_temp(time) {
                    if (!GC_data["loop"][ID].stop) {
                        GC_data["loop"][ID].NTA_time = time;
                        time -= GC_data["loop"][ID].time_adjustment;
                        if ((Math.floor((normal_temp_fps % (normal_fps / GC_data["loop"][ID].set_fps))) == 0 || GC_data["loop"][ID].set_fps == Infinity) && time != undefined) {
                            temp_fps++;
                            let lag = 0;
                            if (Math.round((time - d) * 10) / 10 != NaN) {
                                if (is_first) {
                                    is_first = false;
                                } else {
                                    lag = Math.round((time - d) * 10) / 10;
                                }
                            }
                            before_process = [];
                            GC_data["loop"][ID].Fn_time = time - lag;
                            GC_data["loop"][ID].Ln_time = time;
                            function_name(lag, fps, time, ID);
                            d = time;
                        }
                        normal_temp_fps++;
                        requestAnimationFrame(loop_temp);
                    } else {
                        delete GC_data["loop"][ID];
                        clearInterval(e);
                    }
                }
                loop_temp(start_time);
            },
            set_time: function (ID, time) {
                GC_data["loop"][ID].time_adjustment = (GC_data["loop"][ID].NTA_time - time);
                GC_data["loop"][ID]["set_time"] = time;
            },
            stop: function (ID) {
                GC_data["loop"][ID].stop = true;
            },
            set: function (ID, fps) {
                GC_data["loop"][ID].set_fps = fps;
            },
            is_in: function (ID, time) {
                let return_ans = false;
                if (GC_data["loop_trigger"][time] == null) {
                    if ((time < GC_data["loop"][ID].Ln_time && time > GC_data["loop"][ID].set_time)) {
                        GC_data["loop_trigger"][time] = true;
                        return_ans = true;
                    }
                }
                return return_ans;
            },
        },
        Get: {
            color: function (x, y, width, height) {
                let res = [];
                let pos = transform_position(x, y);
                let pos2 = transform_position(width, height);
                res.push(GC_data[EC_id]["context"].getImageData(pos.x, pos.y, pos2.x, pos2.y).data);
                return res;
            },
            url: function (type = "png") { return elm[0].toDataURL(`image/${type}`) },
            image: function (img_url, function_name) {
                if (GC_data["image"][img_url] == null) {
                    GC_data["image"][img_url] = new Image();
                    GC_data["image"][img_url].src = img_url;
                    GC_data["is_loaded_image"][img_url] = false;
                }
                if (GC_data["is_loaded_image"][img_url] == false) {
                    GC_data["image"][img_url].onload = () => {
                        GC_data["is_loaded_image"][img_url] = true;
                        if (function_name != null) {
                            requestAnimationFrame(function_name.bind(this, GC_data["image"][img_url]));
                        }
                    }
                } else {
                    if (function_name != null) {
                        requestAnimationFrame(function_name.bind(this, GC_data["image"][img_url]));
                    }
                }
            },
            size: () => {
                return GC_size[EC_id];
            },
            transform: function (x = 0, y = 0, size = 0, Invert = false) {
                if (Invert) {
                    Un_transform_position(x, y, size);
                } else {
                    transform_position(x, y, size);
                }
            }
        },
        GetEvent: {
            key: () => { return GC_data["input_key"] },
            click: function (function_name) {
                const EV_lm = GC_data[EC_id].elm;
                EV_lm.addEventListener("click", function (e) {
                    var clientRect = EV_lm.getBoundingClientRect();
                    let pos = Un_transform_position((e.clientX - clientRect.left) * GC_data[EC_id].quality, (e.clientY - clientRect.top) * GC_data[EC_id].quality);
                    setTimeout(function_name, 0, pos.x, pos.y);
                })
            },
            menu: function (function_name) {
                const EV_lm = GC_data[EC_id].elm;
                EV_lm.addEventListener("contextmenu", function (e) {
                    var clientRect = EV_lm.getBoundingClientRect();
                    let pos = Un_transform_position((e.clientX - clientRect.left) * GC_data[EC_id].quality, (e.clientY - clientRect.top) * GC_data[EC_id].quality);
                    setTimeout(function_name, 0, pos.x, pos.y);
                })
            },
            move: function (function_name) {
                const EV_lm = GC_data[EC_id].elm;
                EV_lm.addEventListener("touchmove", function (e) {
                    var clientRect = EV_lm.getBoundingClientRect();
                    let pos = Un_transform_position((e.touches[0].pageX - clientRect.left) * GC_data[EC_id].quality, (e.touches[0].pageY - clientRect.top) * GC_data[EC_id].quality);
                    setTimeout(function_name, 0, pos.x, pos.y);
                })
                EV_lm.addEventListener("mousemove", function (e) {
                    var clientRect = EV_lm.getBoundingClientRect();
                    let pos = Un_transform_position((e.clientX - clientRect.left) * GC_data[EC_id].quality, (e.clientY - clientRect.top) * GC_data[EC_id].quality);
                    setTimeout(function_name, 0, pos.x, pos.y);
                })
            },
            clicking: function (functions) {
                const EV_lm = GC_data[EC_id].elm;
                GC_data.clicking_judge_box.push(false);
                GC_data.clicking_judge_box_position.push([0, 0]);
                GC_data.clicking_judge_box_position_2.push([0, 0]);
                let i = GC_data.clicking_judge_i;
                EV_lm.addEventListener("touchstart", function (e) {
                    var clientRect = EV_lm.getBoundingClientRect();
                    let pos1 = Un_transform_position((e.touches[0].pageX - clientRect.left) * GC_data[EC_id].quality, (e.touches[0].pageY - clientRect.top) * GC_data[EC_id].quality);
                    GC_data.clicking_judge_box_position_2[i] = ([pos1.x, pos1.y]);
                    GC_data.clicking_judge_box_position[i] = ([pos1.x, pos1.y]);
                    GC_data.clicking_judge_box[i] = true;
                })
                EV_lm.addEventListener("mousedown", function (e) {
                    var clientRect = EV_lm.getBoundingClientRect();
                    let pos1 = Un_transform_position((e.clientX - clientRect.left) * GC_data[EC_id].quality, (e.clientY - clientRect.top) * GC_data[EC_id].quality);
                    GC_data.clicking_judge_box_position_2[i] = ([pos1.x, pos1.y]);
                    GC_data.clicking_judge_box[i] = true;
                })
                EV_lm.addEventListener("touchend", function (e) {
                    GC_data.clicking_judge_box[i] = false;
                })
                EV_lm.addEventListener("mouseup", function (e) {
                    GC_data.clicking_judge_box[i] = false;
                })
                EV_lm.addEventListener("touchmove", function (e) {
                    if (GC_data.clicking_judge_box[i]) {
                        var clientRect = EV_lm.getBoundingClientRect();
                        let pos1 = Un_transform_position((e.touches[0].pageX - clientRect.left) * GC_data[EC_id].quality, (e.touches[0].pageY - clientRect.top) * GC_data[EC_id].quality);
                        GC_data.clicking_judge_box_position[i] = ([pos1.x, pos1.y]);
                    }
                })
                EV_lm.addEventListener("mousemove", function (e) {
                    if (GC_data.clicking_judge_box[i]) {
                        var clientRect = EV_lm.getBoundingClientRect();
                        let pos1 = Un_transform_position((e.clientX - clientRect.left) * GC_data[EC_id].quality, (e.clientY - clientRect.top) * GC_data[EC_id].quality);
                        GC_data.clicking_judge_box_position[i] = ([pos1.x, pos1.y]);
                    }
                })
                setInterval(function () {
                    if (GC_data.clicking_judge_box[i]) {
                        functions(GC_data.clicking_judge_box_position[i][0], GC_data.clicking_judge_box_position[i][1], GC_data.clicking_judge_box_position_2[i][0], GC_data.clicking_judge_box_position_2[i][1]);
                    }
                })
                GC_data.clicking_judge_i++;
            },
        },
        object: {
            create: function (name, x, y, direction) {
                GC_data["object"][name] = {};
                GC_data["object"][name]["x"] = x;
                GC_data["object"][name]["y"] = y;
                GC_data["object"][name]["dir"] = direction % 360;
                GC_data["object"][name]["class"] = name;
            },
            delete: function (name) {
                delete GC_data["object"][name];
            },
            move: function (name, distance) {
                GC_data["object"][name]["x"] += Math.cos(GC_data["object"][name]["dir"] * (Math.PI / 180)) * distance;
                GC_data["object"][name]["y"] += Math.sin(GC_data["object"][name]["dir"] * (Math.PI / 180)) * distance;
                if (GC_data["object"][name]["reload"] == true) {
                    let vertex = GC_data["object"][name]["vertex"];
                    GC().object.collision(name, vertex.type, vertex);
                }
            },
            rotate: function (name, deg) {
                GC_data["object"][name]["dir"] += deg;
                GC_data["object"][name]["dir"] = (GC_data["object"][name]["dir"] % 360);
                if (GC_data["object"][name]["reload"] == true) {
                    let vertex = GC_data["object"][name]["vertex"];
                    GC().object.collision(name, vertex.type, vertex);
                }
            },
            move_pos: function (name, x, y) {
                GC_data["object"][name]["x"] += x;
                GC_data["object"][name]["y"] += y;
                if (GC_data["object"][name]["reload"] == true) {
                    let vertex = GC_data["object"][name]["vertex"];
                    GC().object.collision(name, vertex.type, vertex);
                }
            },
            set: function (name, x, y, direction) {
                if (x != null) {
                    GC_data["object"][name]["x"] = x;
                }
                if (y != null) {
                    GC_data["object"][name]["y"] = y;
                }
                if (direction != null) {
                    GC_data["object"][name]["dir"] = direction % 360;
                }
                if (GC_data["object"][name]["reload"] == true) {
                    let vertex = GC_data["object"][name]["vertex"];
                    GC().object.collision(name, vertex.type, vertex);
                }
            },
            value: function (name, key, value) {
                GC_data["object"][name][key] = value;
            },
            get: function (name) {
                return GC_data["object"][name];
            },
            get_object_by_class: function (class_name) {
                let return_array = [];
                for (const key in GC_data["object"]) {
                    if (Object.prototype.hasOwnProperty.call(GC_data["object"], key)) {
                        const element = GC_data["object"][key];
                        if (element.class == class_name) {
                            return_array.push(element);
                        }
                    }
                }
                return return_array;
            },
            get_object_by_key: function (key, value) {
                let return_array = [];
                let Tm_key = key;
                for (const key in GC_data["object"]) {
                    if (Object.prototype.hasOwnProperty.call(GC_data["object"], key)) {
                        const element = GC_data["object"][key];
                        if (element[Tm_key] == value) {
                            return_array.push({ elm: element, name: key });
                        }
                    }
                }
                return return_array;
            },
            is_touch_edge: function (name, col = { margin: 0, on_collision: true }) {
                let pos = transform_position(GC_data["object"][name].x, GC_data["object"][name].y, col.margin);
                let is_touch = false;
                if (col.on_collision) {
                    let pos1 = transform_position(GC_data["object"][name]["collision"].x, GC_data["object"][name]["collision"].y);
                    let pos2 = transform_position(GC_data["object"][name]["collision"].dx, GC_data["object"][name]["collision"].dy);
                    if (Math.max(pos1.x, pos2.x) > GC_size[EC_id].width || Math.min(pos1.x, pos2.x) < 0 || Math.max(pos1.y, pos2.y) > GC_size[EC_id].height || Math.min(pos1.y, pos2.y) < 0) {
                        is_touch = true;
                    } else {
                        is_touch = false;
                    }
                } else {
                    if ((pos.x - pos.size) > GC_size[EC_id].width || pos.x + pos.size < 0 || pos.y - pos.size > GC_size[EC_id].height || pos.y + pos.size < 0) {
                        is_touch = true;
                    } else {
                        is_touch = false;
                    }
                }
                if (GC_data["object"][name]["only_draw"] == true && GC_data["object"][name]["now_draw"] != true) {
                    is_touch = false;
                }
                return is_touch;
            },
            exterior: function (name, function_name) {
                GC_data["prayer"] = {
                    width_time: ((GC_data["object"][name]["collision"].dx - GC_data["object"][name]["collision"].x) / 100),
                    height_time: ((GC_data["object"][name]["collision"].dy - GC_data["object"][name]["collision"].y) / 100),
                    x: GC_data["object"][name]["collision"].x,
                    y: GC_data["object"][name]["collision"].y,
                };
                GC_data["object"][name]["exterior"] = function_name;
                GC_data["prayer"] = {
                    width_time: 1,
                    height_time: 1,
                    x: 0,
                    y: 0,
                };
            },
            collision: function (name, type = "box", vertex = { width: 0, height: 0, size: 0 }, only_draw = true) {
                GC_data["object"][name]["only_draw"] = only_draw;
                GC_data["object"][name]["vertex"] = vertex;
                GC_data["object"][name]["vertex"]["type"] = type;
                if (type == "circle") {
                    GC_data["object"][name]["collision"] = {
                        x: GC_data["object"][name].x - vertex.size,
                        y: GC_data["object"][name].y - vertex.size
                    };
                    GC_data["object"][name]["collision"]["dx"] = GC_data["object"][name].x + vertex.size;
                    GC_data["object"][name]["collision"]["dy"] = GC_data["object"][name].y + vertex.size;
                    GC_data["object"][name]["collision"]["center"] = { x: GC_data["object"][name].x, y: GC_data["object"][name].y };
                } else if (type == "box") {
                    GC_data["object"][name]["collision"] = {
                        x: GC_data["object"][name].x - (vertex.width / 2),
                        y: GC_data["object"][name].y - (vertex.height / 2)
                    };
                    GC_data["object"][name]["collision"]["dx"] = GC_data["object"][name].x + (vertex.width / 2);
                    GC_data["object"][name]["collision"]["dy"] = GC_data["object"][name].y + (vertex.height / 2);
                    GC_data["object"][name]["collision"]["center"] = { x: GC_data["object"][name].x, y: GC_data["object"][name].y };
                }
            },
            draw: function (name, reload = true) {
                if (GC_data["object"][name] != null) {
                    GC_data["object"][name]["now_draw"] = true;
                    if (reload) {
                        GC_data["object"][name]["reload"] = true;
                        let vertex = GC_data["object"][name]["vertex"];
                        GC().object.collision(name, vertex.type, vertex);
                    }
                    GC_data["prayer"] = {
                        width_time: ((GC_data["object"][name]["collision"].dx - GC_data["object"][name]["collision"].x) / 100),
                        height_time: ((GC_data["object"][name]["collision"].dy - GC_data["object"][name]["collision"].y) / 100),
                        x: GC_data["object"][name]["collision"].x,
                        y: GC_data["object"][name]["collision"].y,
                    };
                    GC_data["object"][name]["exterior"]();
                    GC_data["prayer"] = {
                        width_time: 1,
                        height_time: 1,
                        x: 0,
                        y: 0,
                    };
                }
            },
            reload: function (name) {
                if (GC_data["object"][name] != null) {
                    GC_data["object"][name]["reload"] = true;
                    let vertex = GC_data["object"][name]["vertex"];
                    GC().object.collision(name, vertex.type, vertex);
                }
            },
            dupe: function (name) {
                if (GC_data["object"][name] != null) {
                    if (GC_data["object"][`${name}`]["clone_num"] == null) {
                        GC_data["object"][`${name}`]["clone_num"] = 0;
                    }
                    GC_data["object"][`${name}`]["clone_num"]++;
                    GC_data["object"][`${name}-${GC_data["object"][`${name}`]["clone_num"]}`] = JSON.parse(JSON.stringify(GC_data["object"][`${name}`]));
                    if (GC_data["object"][name]["exterior"] != null) {
                        GC_data["object"][`${name}-${GC_data["object"][`${name}`]["clone_num"]}`]["exterior"] = GC_data["object"][name]["exterior"];
                    }
                    return (`${name}-${GC_data["object"][`${name}`]["clone_num"]}`);
                }
            },
            touch_obj: function (name) {
                let obj_name = [];
                for (const key in GC_data["object"]) {
                    if (Object.prototype.hasOwnProperty.call(GC_data["object"], key)) {
                        if (name != key) {
                            const element = GC_data["object"][key]["collision"];
                            if (element != null) {
                                if (GC_data["object"][key]["only_draw"] == true && GC_data["object"][key]["now_draw"] != true) {

                                } else {
                                    let col = GC_data["object"][name]["collision"];
                                    if (Math.max(col.x, col.dx) > Math.min(element.x, element.dx)
                                        && Math.min(col.x, col.dx) < Math.max(element.x, element.dx)
                                        && Math.max(col.y, col.dy) > Math.min(element.y, element.dy)
                                        && Math.min(col.y, col.dy) < Math.max(element.y, element.dy)) {
                                        obj_name.push(key);
                                    }
                                }
                            }
                        }
                    }
                }
                return obj_name;
            },
            touch_color: function (name) {
                if (GC_data["object"][name] != null) {
                    // GC_data["prayer"] = {
                    //     width_time: ((GC_data["object"][name]["collision"].dx - GC_data["object"][name]["collision"].x) / 100),
                    //     height_time: ((GC_data["object"][name]["collision"].dy - GC_data["object"][name]["collision"].y) / 100),
                    //     x: GC_data["object"][name]["collision"].x,
                    //     y: GC_data["object"][name]["collision"].y,
                    // };
                    let temp_return_ans = GC(selector).Get.color(GC_data["object"][name]["collision"].x, GC_data["object"][name]["collision"].y, GC_data["object"][name]["collision"].dx - GC_data["object"][name]["collision"].x, GC_data["object"][name]["collision"].dy - GC_data["object"][name]["collision"].y)[0];
                    let return_ans = [];
                    for (let i = 0; i < temp_return_ans.length; i += 4) {
                        return_ans.push([temp_return_ans[i], temp_return_ans[i + 1], temp_return_ans[i + 2], temp_return_ans[i + 3]])
                    }
                    // GC_data["prayer"] = {
                    //     width_time: 1,
                    //     height_time: 1,
                    //     x: 0,
                    //     y: 0,
                    // };
                    return return_ans;
                }
            }
        },
        sound: {
            play: function (sound_file_name, volume, name, startTime) {
                function isPlaying(audio) {
                    return !audio.paused;
                }

                let is_foakwop = false;

                for (let i = 0; i < GC_data["music_cash"].length; i++) {
                    if (GC_data["music_cash"][i].name == sound_file_name) {
                        if (!isPlaying(GC_data["music_cash"][i].audio)) {
                            GC_data["music_cash"][i].audio.currentTime = startTime || 0; // デフォルトは0秒から再生
                            GC_data["music_cash"][i].audio.play();
                            GC_data["music_cash"][i].audio.volume = (volume / 100);
                            is_foakwop = true;
                            break;
                        }
                    }
                }

                if (!is_foakwop) {
                    GC_data["music_data"][`${name}`] = new Audio();
                    GC_data["music_data"][name].preload = "auto";
                    GC_data["music_data"][name].src = sound_file_name;
                    GC_data["music_data"][name].load();
                    GC_data["music_data"][name].currentTime = startTime || 0; // デフォルトは0秒から再生
                    GC_data["music_data"][name].play();
                    GC_data["music_data"][name].volume = (volume / 100);
                    GC_data["music_cash"].push({ name: sound_file_name, audio: GC_data["music_data"][name] });
                }
            },
            rev: function (sound_file_name, name) {
                GC_data["music_data"][`${name}`] = new Audio();
                GC_data["music_data"][name].preload = "auto";
                GC_data["music_data"][name].src = sound_file_name;
                GC_data["music_data"][name].load();
                GC_data["music_cash"].push({ name: sound_file_name, audio: GC_data["music_data"][name] });
            },
            volume: function (volume, name) {
                if (GC_data["music_data"][name] != null) {
                    GC_data["music_data"][name].volume = (volume / 100);
                }
            },
            stop: function (name) {
                GC_data["music_data"][name].load();
                GC_data["music_data"][name].pause();
            },
            Get_info: function (name) {
                let data = {
                    duration: GC_data["music_data"][name].duration,
                    currentTime: GC_data["music_data"][name].currentTime
                }
                return data;
            }
        }
    }
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