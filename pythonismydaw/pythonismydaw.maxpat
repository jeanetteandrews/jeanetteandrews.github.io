{
    "patcher": {
        "fileversion": 1,
        "appversion": {
            "major": 9,
            "minor": 1,
            "revision": 2,
            "architecture": "x64",
            "modernui": 1
        },
        "classnamespace": "box",
        "rect": [ 238.0, 124.0, 1122.0, 539.0 ],
        "boxes": [
            {
                "box": {
                    "attr": "ogain",
                    "id": "obj-12",
                    "maxclass": "attrui",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 1025.0, 94.0, 150.0, 22.0 ]
                }
            },
            {
                "box": {
                    "attr": "oht",
                    "id": "obj-13",
                    "maxclass": "attrui",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 1025.0, 123.0, 150.0, 22.0 ]
                }
            },
            {
                "box": {
                    "attr": "olt",
                    "id": "obj-15",
                    "maxclass": "attrui",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 1025.0, 152.0, 150.0, 22.0 ]
                }
            },
            {
                "box": {
                    "attr": "ordl",
                    "id": "obj-16",
                    "maxclass": "attrui",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 1025.0, 180.0, 150.0, 22.0 ]
                }
            },
            {
                "box": {
                    "attr": "oat",
                    "id": "obj-17",
                    "maxclass": "attrui",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 1025.0, 207.0, 150.0, 22.0 ]
                }
            },
            {
                "box": {
                    "attr": "ort",
                    "id": "obj-18",
                    "maxclass": "attrui",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 1025.0, 235.0, 150.0, 22.0 ]
                }
            },
            {
                "box": {
                    "attr": "bgain",
                    "id": "obj-2",
                    "maxclass": "attrui",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 860.0, 94.0, 150.0, 22.0 ]
                }
            },
            {
                "box": {
                    "attr": "bht",
                    "id": "obj-3",
                    "maxclass": "attrui",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 860.0, 123.0, 150.0, 22.0 ]
                }
            },
            {
                "box": {
                    "attr": "blt",
                    "id": "obj-4",
                    "maxclass": "attrui",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 860.0, 152.0, 150.0, 22.0 ]
                }
            },
            {
                "box": {
                    "attr": "brdl",
                    "id": "obj-5",
                    "maxclass": "attrui",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 860.0, 180.0, 150.0, 22.0 ]
                }
            },
            {
                "box": {
                    "attr": "bat",
                    "id": "obj-6",
                    "maxclass": "attrui",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 860.0, 207.0, 150.0, 22.0 ]
                }
            },
            {
                "box": {
                    "attr": "brt",
                    "id": "obj-7",
                    "maxclass": "attrui",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 860.0, 235.0, 150.0, 22.0 ]
                }
            },
            {
                "box": {
                    "autosave": 1,
                    "id": "obj-1",
                    "inletInfo": {
                        "IOInfo": [
                            {
                                "type": "midi",
                                "index": -1,
                                "tag": "",
                                "comment": ""
                            }
                        ]
                    },
                    "maxclass": "newobj",
                    "numinlets": 2,
                    "numoutlets": 3,
                    "outletInfo": {
                        "IOInfo": [
                            {
                                "type": "signal",
                                "index": 1,
                                "tag": "out1",
                                "comment": ""
                            },
                            {
                                "type": "signal",
                                "index": 2,
                                "tag": "out2",
                                "comment": ""
                            }
                        ]
                    },
                    "outlettype": [ "signal", "signal", "list" ],
                    "patching_rect": [ 333.0, 288.0, 605.0, 22.0 ],
                    "rnboattrcache": {
                        "hat": {
                            "label": "hat",
                            "isEnum": 0,
                            "parsestring": ""
                        },
                        "start": {
                            "label": "start",
                            "isEnum": 0,
                            "parsestring": ""
                        },
                        "krdl": {
                            "label": "krdl",
                            "isEnum": 0,
                            "parsestring": ""
                        },
                        "sat": {
                            "label": "sat",
                            "isEnum": 0,
                            "parsestring": ""
                        },
                        "hrt": {
                            "label": "hrt",
                            "isEnum": 0,
                            "parsestring": ""
                        },
                        "slt": {
                            "label": "slt",
                            "isEnum": 0,
                            "parsestring": ""
                        },
                        "hgain": {
                            "label": "hgain",
                            "isEnum": 0,
                            "parsestring": ""
                        },
                        "krt": {
                            "label": "krt",
                            "isEnum": 0,
                            "parsestring": ""
                        },
                        "sht": {
                            "label": "sht",
                            "isEnum": 0,
                            "parsestring": ""
                        },
                        "kgain": {
                            "label": "kgain",
                            "isEnum": 0,
                            "parsestring": ""
                        },
                        "kht": {
                            "label": "kht",
                            "isEnum": 0,
                            "parsestring": ""
                        },
                        "srdl": {
                            "label": "srdl",
                            "isEnum": 0,
                            "parsestring": ""
                        },
                        "srt": {
                            "label": "srt",
                            "isEnum": 0,
                            "parsestring": ""
                        },
                        "klt": {
                            "label": "klt",
                            "isEnum": 0,
                            "parsestring": ""
                        },
                        "sgain": {
                            "label": "sgain",
                            "isEnum": 0,
                            "parsestring": ""
                        },
                        "hht": {
                            "label": "hht",
                            "isEnum": 0,
                            "parsestring": ""
                        },
                        "hrdl": {
                            "label": "hrdl",
                            "isEnum": 0,
                            "parsestring": ""
                        },
                        "hlt": {
                            "label": "hlt",
                            "isEnum": 0,
                            "parsestring": ""
                        },
                        "kat": {
                            "label": "kat",
                            "isEnum": 0,
                            "parsestring": ""
                        }
                    },
                    "rnboversion": "1.4.2",
                    "saved_attribute_attributes": {
                        "valueof": {
                            "parameter_invisible": 1,
                            "parameter_longname": "rnbo~[1]",
                            "parameter_modmode": 0,
                            "parameter_shortname": "rnbo~[1]",
                            "parameter_type": 3
                        }
                    },
                    "saved_object_attributes": {
                        "optimization": "O1",
                        "parameter_enable": 1,
                        "uuid": "98bb6e6f-62e8-11f0-ae6f-38f9d374b840"
                    },
                    "snapshot": {
                        "filetype": "C74Snapshot",
                        "version": 2,
                        "minorversion": 0,
                        "name": "snapshotlist",
                        "origin": "rnbo~",
                        "type": "list",
                        "subtype": "Undefined",
                        "embed": 1,
                        "snapshot": {
                            "hrt": {
                                "value": 2000.0
                            },
                            "hlt": {
                                "value": 0.007
                            },
                            "hht": {
                                "value": 0.0
                            },
                            "srt": {
                                "value": 4000.0
                            },
                            "srdl": {
                                "value": 30.0
                            },
                            "sat": {
                                "value": 20.0
                            },
                            "hat": {
                                "value": 1.0
                            },
                            "slt": {
                                "value": 0.1
                            },
                            "krt": {
                                "value": 4000.0
                            },
                            "krdl": {
                                "value": 30.0
                            },
                            "kht": {
                                "value": 0.0
                            },
                            "kat": {
                                "value": 50.0
                            },
                            "klt": {
                                "value": 0.01
                            },
                            "hrdl": {
                                "value": 1.0
                            },
                            "kgain": {
                                "value": 1.0
                            },
                            "sgain": {
                                "value": 1.0
                            },
                            "__presetid": "/Users/jeanette/GitHub/jeanetteandrews.github.io/pythonismydaw/budots.rnbopat",
                            "start": {
                                "value": 1.0
                            },
                            "hgain": {
                                "value": 1.0
                            },
                            "sht": {
                                "value": 0.0
                            }
                        },
                        "snapshotlist": {
                            "current_snapshot": 0,
                            "entries": [
                                {
                                    "filetype": "C74Snapshot",
                                    "version": 2,
                                    "minorversion": 0,
                                    "name": "/Users/jeanette/GitHub/jeanetteandrews.github.io/pythonismydaw/pythonismydaw.rnbopat",
                                    "origin": "/Users/jeanette/GitHub/jeanetteandrews.github.io/pythonismydaw/budots.rnbopat",
                                    "type": "rnbo",
                                    "subtype": "",
                                    "embed": 1,
                                    "snapshot": {
                                        "hrt": {
                                            "value": 2000.0
                                        },
                                        "hlt": {
                                            "value": 0.007
                                        },
                                        "hht": {
                                            "value": 0.0
                                        },
                                        "srt": {
                                            "value": 4000.0
                                        },
                                        "srdl": {
                                            "value": 30.0
                                        },
                                        "sat": {
                                            "value": 20.0
                                        },
                                        "hat": {
                                            "value": 1.0
                                        },
                                        "slt": {
                                            "value": 0.1
                                        },
                                        "krt": {
                                            "value": 4000.0
                                        },
                                        "krdl": {
                                            "value": 30.0
                                        },
                                        "kht": {
                                            "value": 0.0
                                        },
                                        "kat": {
                                            "value": 50.0
                                        },
                                        "klt": {
                                            "value": 0.01
                                        },
                                        "hrdl": {
                                            "value": 1.0
                                        },
                                        "kgain": {
                                            "value": 1.0
                                        },
                                        "sgain": {
                                            "value": 1.0
                                        },
                                        "__presetid": "/Users/jeanette/GitHub/jeanetteandrews.github.io/pythonismydaw/budots.rnbopat",
                                        "start": {
                                            "value": 1.0
                                        },
                                        "hgain": {
                                            "value": 1.0
                                        },
                                        "sht": {
                                            "value": 0.0
                                        }
                                    },
                                    "fileref": {
                                        "name": "/Users/jeanette/GitHub/jeanetteandrews.github.io/pythonismydaw/pythonismydaw.rnbopat",
                                        "filename": ".maxsnap",
                                        "filepath": "~/Documents/Max 9/Snapshots",
                                        "filepos": -1,
                                        "snapshotfileid": "f0107784d2b966886defd5a4ba4d79c3"
                                    }
                                }
                            ]
                        }
                    },
                    "text": "rnbo~ @patchername /Users/jeanette/GitHub/jeanetteandrews.github.io/pythonismydaw/pythonismydaw.rnbopat",
                    "varname": "rnbo~[1]"
                }
            },
            {
                "box": {
                    "id": "obj-10",
                    "maxclass": "newobj",
                    "numinlets": 2,
                    "numoutlets": 0,
                    "patching_rect": [ 350.0, 489.0, 35.0, 22.0 ],
                    "text": "dac~"
                }
            },
            {
                "box": {
                    "attr": "start",
                    "id": "obj-14",
                    "maxclass": "attrui",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 156.0, 94.0, 150.0, 22.0 ]
                }
            },
            {
                "box": {
                    "attr": "kgain",
                    "id": "obj-19",
                    "maxclass": "attrui",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 333.0, 94.0, 150.0, 22.0 ]
                }
            },
            {
                "box": {
                    "attr": "kht",
                    "id": "obj-20",
                    "maxclass": "attrui",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 333.0, 123.0, 150.0, 22.0 ]
                }
            },
            {
                "box": {
                    "attr": "klt",
                    "id": "obj-21",
                    "maxclass": "attrui",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 333.0, 152.0, 150.0, 22.0 ]
                }
            },
            {
                "box": {
                    "attr": "krdl",
                    "id": "obj-22",
                    "maxclass": "attrui",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 333.0, 180.0, 150.0, 22.0 ]
                }
            },
            {
                "box": {
                    "attr": "kat",
                    "id": "obj-23",
                    "maxclass": "attrui",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 333.0, 207.0, 150.0, 22.0 ]
                }
            },
            {
                "box": {
                    "attr": "krt",
                    "id": "obj-24",
                    "maxclass": "attrui",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 333.0, 235.0, 150.0, 22.0 ]
                }
            },
            {
                "box": {
                    "attr": "sgain",
                    "id": "obj-38",
                    "maxclass": "attrui",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 518.0, 94.0, 150.0, 22.0 ]
                }
            },
            {
                "box": {
                    "attr": "sht",
                    "id": "obj-40",
                    "maxclass": "attrui",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 518.0, 123.0, 150.0, 22.0 ]
                }
            },
            {
                "box": {
                    "attr": "slt",
                    "id": "obj-41",
                    "maxclass": "attrui",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 518.0, 152.0, 150.0, 22.0 ]
                }
            },
            {
                "box": {
                    "attr": "srdl",
                    "id": "obj-43",
                    "maxclass": "attrui",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 518.0, 180.0, 150.0, 22.0 ]
                }
            },
            {
                "box": {
                    "attr": "sat",
                    "id": "obj-44",
                    "maxclass": "attrui",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 518.0, 207.0, 150.0, 22.0 ]
                }
            },
            {
                "box": {
                    "attr": "srt",
                    "id": "obj-45",
                    "maxclass": "attrui",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 518.0, 235.0, 150.0, 22.0 ]
                }
            },
            {
                "box": {
                    "attr": "hgain",
                    "id": "obj-53",
                    "maxclass": "attrui",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 692.0, 94.0, 150.0, 22.0 ]
                }
            },
            {
                "box": {
                    "attr": "hht",
                    "id": "obj-54",
                    "maxclass": "attrui",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 692.0, 123.0, 150.0, 22.0 ]
                }
            },
            {
                "box": {
                    "attr": "hlt",
                    "id": "obj-55",
                    "maxclass": "attrui",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 692.0, 152.0, 150.0, 22.0 ]
                }
            },
            {
                "box": {
                    "attr": "hrdl",
                    "id": "obj-56",
                    "maxclass": "attrui",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 692.0, 180.0, 150.0, 22.0 ]
                }
            },
            {
                "box": {
                    "attr": "hat",
                    "id": "obj-57",
                    "maxclass": "attrui",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 692.0, 207.0, 150.0, 22.0 ]
                }
            },
            {
                "box": {
                    "attr": "hrt",
                    "id": "obj-58",
                    "maxclass": "attrui",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 692.0, 235.0, 150.0, 22.0 ]
                }
            }
        ],
        "lines": [
            {
                "patchline": {
                    "destination": [ "obj-10", 1 ],
                    "source": [ "obj-1", 1 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-10", 0 ],
                    "source": [ "obj-1", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-1", 0 ],
                    "source": [ "obj-12", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-1", 0 ],
                    "source": [ "obj-13", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-1", 0 ],
                    "source": [ "obj-14", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-1", 0 ],
                    "source": [ "obj-15", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-1", 0 ],
                    "source": [ "obj-16", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-1", 0 ],
                    "source": [ "obj-17", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-1", 0 ],
                    "source": [ "obj-18", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-1", 0 ],
                    "source": [ "obj-19", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-1", 0 ],
                    "source": [ "obj-2", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-1", 0 ],
                    "source": [ "obj-20", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-1", 0 ],
                    "source": [ "obj-21", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-1", 0 ],
                    "source": [ "obj-22", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-1", 0 ],
                    "source": [ "obj-23", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-1", 0 ],
                    "source": [ "obj-24", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-1", 0 ],
                    "source": [ "obj-3", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-1", 0 ],
                    "source": [ "obj-38", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-1", 0 ],
                    "source": [ "obj-4", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-1", 0 ],
                    "source": [ "obj-40", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-1", 0 ],
                    "source": [ "obj-41", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-1", 0 ],
                    "source": [ "obj-43", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-1", 0 ],
                    "source": [ "obj-44", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-1", 0 ],
                    "source": [ "obj-45", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-1", 0 ],
                    "source": [ "obj-5", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-1", 0 ],
                    "source": [ "obj-53", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-1", 0 ],
                    "source": [ "obj-54", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-1", 0 ],
                    "source": [ "obj-55", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-1", 0 ],
                    "source": [ "obj-56", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-1", 0 ],
                    "source": [ "obj-57", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-1", 0 ],
                    "source": [ "obj-58", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-1", 0 ],
                    "source": [ "obj-6", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-1", 0 ],
                    "source": [ "obj-7", 0 ]
                }
            }
        ],
        "parameters": {
            "obj-1": [ "rnbo~[1]", "rnbo~[1]", 0 ],
            "inherited_shortname": 1
        },
        "autosave": 0
    }
}