
//% color="#12b886" iconWidth=50 iconHeight=40
namespace qrcodedecode{


    //% block="读取本地图片[PATH]" blockType="command"
    //% PATH.shadow="string" PATH.defl="qrcode.png"
    export function read(parameter: any, block: any) {
        let path=parameter.PATH.code;

        Generator.addImport(`import cv2\nimport numpy as np\nfrom pyzbar.pyzbar import decode`)
        //Generator.addCode(`cv2.cvtColor(cv2.imread(${path}),cv2.COLOR_BGR2RGB)`)
        Generator.addCode(`qrimg_src = cv2.imread(${path})

if qrimg_src is None:
    raise RuntimeError(${path} +": file is not found!")
else:
    qrimg_src = cv2.cvtColor(qrimg_src,cv2.COLOR_BGR2RGB)`)

    }



    //% block="初始化摄像头 编号[CAMNUM] 像素宽[W]高[H]" blockType="command"
    //% CAMNUM.shadow="number" CAMNUM.defl="0"
    //% W.shadow="number" W.defl="320"
    //% H.shadow="number" H.defl="240"
    export function readcap(parameter: any, block: any) {
        let num=parameter.CAMNUM.code;
        let w=parameter.W.code;
        let h=parameter.H.code;
        Generator.addImport(`import cv2\nimport numpy as np\nfrom pyzbar.pyzbar import decode`)
        
        Generator.addCode(`cap = cv2.VideoCapture(${num})`)
        Generator.addCode(`cap.set(cv2.CAP_PROP_FRAME_WIDTH, ${w})`)
        Generator.addCode(`cap.set(cv2.CAP_PROP_FRAME_HEIGHT, ${h})`)
        Generator.addCode(`cap.set(cv2.CAP_PROP_BUFFERSIZE, 1)`)
        Generator.addCode(`while not cap.isOpened():
    continu`)

    }

    //% block="读取摄像头一帧图片" blockType="command"
    export function readcapcapture(parameter: any, block: any) {
        Generator.addImport(`import cv2\nimport numpy as np\nfrom pyzbar.pyzbar import decode`)
        Generator.addCode(`cv2.waitKey(10)\nqrimg_success, qrimg_src = cap.read()`)

    }
/*
    //% block="将摄像头图片横屏显示" blockType="command"
    export function rotation(parameter: any, block: any) {

        Generator.addCode(`qrimg_src = cv2.rotate(qrimg_src, cv2.ROTATE_90_COUNTERCLOCKWISE)`)

        }

*/
    //% block="---"
    export function noteSep1() {}
/*
    //% block="窗口设置 全屏[FULL]" blockType="command"
    //% FULL.shadow="dropdown" FULL.options="FULL"
    export function screensetting(parameter: any, block: any) {
        let full=parameter.FULL.code;
        if (full == "on"){
            Generator.addInit(`screeninit`,`cv2.namedWindow('qrwindows',cv2.WND_PROP_FULLSCREEN)\ncv2.setWindowProperty('qrwindows', cv2.WND_PROP_FULLSCREEN, cv2.WINDOW_FULLSCREEN)`)
        }
      

        }
*/

    //% block="显示识别窗口" blockType="command"
    export function imshow(parameter: any, block: any) {
        Generator.addImport(`import cv2\nimport numpy as np\nfrom pyzbar.pyzbar import decode`)
        Generator.addInit(`namedWindow`,`cv2.namedWindow("qrwindows", cv2.WINDOW_NORMAL)`)
         Generator.addCode(`cv2.imshow('qrwindows', qrimg_src)\ncv2.waitKey(10)`)


    }
    //% block="关闭识别窗口" blockType="command"
    export function imdestroy(parameter: any, block: any) {
        Generator.addImport(`import cv2\nimport numpy as np\nfrom pyzbar.pyzbar import decode`)
        Generator.addInit(`namedWindow`,`cv2.namedWindow("qrwindows", cv2.WINDOW_NORMAL)`)
        //Generator.addCode(`cv2.destroyWindow('qrwindows')`)
        Generator.addCode(`cv2.destroyAllWindows()`)


    }
    //% block="---"
    export function noteSep2() {}


    //% block="识别读取的图片中的二维码" blockType="command"
    export function decode(parameter: any, block: any) {
        Generator.addImport(`import cv2\nimport numpy as np\nfrom pyzbar.pyzbar import decode`)
        Generator.addCode(`qrcode_val = decode(qrimg_src)`)
        Generator.addCode(`
if len(qrcode_val) > 0:
    for i in range(len(qrcode_val)):
        qrcode_str = qrcode_val[i][0].decode()  
        point_x = qrcode_val[i][2][0]
        point_y = qrcode_val[i][2][1]
        point_w = qrcode_val[i][2][2]
        point_h = qrcode_val[i][2][3]
        point_1_x = qrcode_val[i][3][0][0]
        point_1_y = qrcode_val[i][3][0][1]
        point_2_x = qrcode_val[i][3][1][0]
        point_2_y = qrcode_val[i][3][1][1]
        point_3_x = qrcode_val[i][3][2][0]
        point_3_y = qrcode_val[i][3][2][1]
        point_4_x = qrcode_val[i][3][3][0]
        point_4_y = qrcode_val[i][3][3][1]
        cv2.rectangle(qrimg_src,(point_x,point_y),(point_x+point_w,point_y+point_h),(255,0,255),2)

        cv2.line(qrimg_src, (point_1_x, point_1_y), (point_2_x, point_2_y), (255,0,0), 2, cv2.FILLED)
        cv2.line(qrimg_src, (point_2_x, point_2_y), (point_3_x, point_3_y), (255,0,0), 2, cv2.FILLED)
        cv2.line(qrimg_src, (point_3_x, point_3_y), (point_4_x, point_4_y), (255,0,0), 2, cv2.FILLED)
        cv2.line(qrimg_src, (point_4_x, point_4_y), (point_1_x, point_1_y), (255,0,0), 2, cv2.FILLED)

        cv2.circle(qrimg_src,(point_1_x,point_1_y),5,(255,0,0),2)
        cv2.circle(qrimg_src,(point_2_x,point_2_y),5,(0,255,0),2)
        cv2.circle(qrimg_src,(point_3_x,point_3_y),5,(0,0,255),2)
        cv2.circle(qrimg_src,(point_4_x,point_4_y),5,(255,255,0),2)

        cv2.putText(qrimg_src,qrcode_str,(point_x,point_y-20),cv2.FONT_HERSHEY_COMPLEX,0.4,(0,0,255),1)
`) 
    }
    
    //% block="---"
    export function noteSep3(){}

    //%block="图片中存在二维码？" blockType="boolean"
    export function qrcodeAvailable(parameter: any, block: any) {
        Generator.addImport(`import cv2\nimport numpy as np\nfrom pyzbar.pyzbar import decode`)
        Generator.addCode(`len(qrcode_val)>0`)
 
    } 

    //%block="图片中二维码的数量" blockType="reporter"
    export function qrcodeCount(parameter: any, block: any) {
        Generator.addImport(`import cv2\nimport numpy as np\nfrom pyzbar.pyzbar import decode`)
        Generator.addCode(`len(qrcode_val)`)
 
    } 

    //%block="从识别结果中取第[INDEX]个二维码的[VAL]值" blockType="reporter"
    //% INDEX.shadow="number" INDEX.defl="1"
    //% VAL.shadow="dropdown" VAL.options="VAL"
    export function decodeRead(parameter: any, block: any) {
        let val=parameter.VAL.code;
        let index=parameter.INDEX.code;
        Generator.addImport(`import cv2\nimport numpy as np\nfrom pyzbar.pyzbar import decode`)
        Generator.addCode(`qrcode_val[${index}-1]${val}`)
 
    } 
    


    function replaceQuotationMarks(str:string){
            str=str.replace(/"/g, ""); //去除所有引号
            return str
    }


    
}
