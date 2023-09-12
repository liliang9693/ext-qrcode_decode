
//% color="#12b886" iconWidth=50 iconHeight=40
namespace qrcodedecode{


    //% block="Read local image [PATH]" blockType="command"
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



    //% block="Initialize camera number [CAMNUM] pixel width [W] height [H]" blockType="command"
    //% CAMNUM.shadow="number" CAMNUM.defl="0"
    //% W.shadow="number" W.defl="240"
    //% H.shadow="number" H.defl="320"
    export function readcap(parameter: any, block: any) {
        let num=parameter.CAMNUM.code;
        let w=parameter.W.code;
        let h=parameter.H.code;
        Generator.addImport(`import cv2\nimport numpy as np\nfrom pyzbar.pyzbar import decode`)
        
        // Generator.addCode(`cap = cv2.VideoCapture(${num})`)
        // Generator.addCode(`cap.set(cv2.CAP_PROP_FRAME_WIDTH, ${w})`)
        // Generator.addCode(`cap.set(cv2.CAP_PROP_FRAME_HEIGHT, ${h})`)
        // Generator.addCode(`cap.set(cv2.CAP_PROP_BUFFERSIZE, 1)`)
        Generator.addCode(`cap = cv2.VideoCapture(${num})`)
        Generator.addCode(`while not cap.isOpened():
    continue`)
    Generator.addCode(`cap_w,cap_h=${w},${h}`)
    Generator.addCode(`cv2.namedWindow("qrwindows",cv2.WND_PROP_FULLSCREEN)`)
        
    Generator.addCode(`cv2.setWindowProperty("qrwindows", cv2.WND_PROP_FULLSCREEN, cv2.WINDOW_FULLSCREEN)`)
    }

    //% block="Close the camera" blockType="command"
    export function colsecapcapture(parameter: any, block: any) {
       
        Generator.addCode(`cap.release()`)

    }
    
    //% block="Read a frame from the camera" blockType="command"
    export function readcapcapture(parameter: any, block: any) {
        Generator.addImport(`import cv2\nimport numpy as np\nfrom pyzbar.pyzbar import decode`)
        Generator.addCode(`cv2.waitKey(10)\nqrimg_success, qrimg_src = cap.read()`)
        Generator.addCode(`xmin, ymin, w, h = 250,100,cap_w,cap_h
qrimg_src = qrimg_src[ymin:ymin+h, xmin:xmin+w]`)

    }

    //% block="---"
    export function noteSep1() {}


    //% block="Show recognition window" blockType="command"
    export function imshow(parameter: any, block: any) {
        Generator.addImport(`import cv2\nimport numpy as np\nfrom pyzbar.pyzbar import decode`)
        //Generator.addInit(`namedWindow`,`cv2.namedWindow("qrwindows", cv2.WINDOW_NORMAL)`)
         Generator.addCode(`cv2.imshow('qrwindows', qrimg_src)\ncv2.waitKey(10)`)


    }
    //% block="Close recognition window" blockType="command"
    export function imdestroy(parameter: any, block: any) {
        Generator.addImport(`import cv2\nimport numpy as np\nfrom pyzbar.pyzbar import decode`)
        //Generator.addInit(`namedWindow`,`cv2.namedWindow("qrwindows", cv2.WINDOW_NORMAL)`)
        //Generator.addCode(`cv2.destroyWindow('qrwindows')`)
        Generator.addCode(`cv2.destroyAllWindows()`)


    }
    //% block="---"
    export function noteSep2() {}


    //% block="Recognize the QR code in the read image" blockType="command"
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

    //%block="Is there a QR code in the picture?" blockType="boolean"
    export function qrcodeAvailable(parameter: any, block: any) {
        Generator.addImport(`import cv2\nimport numpy as np\nfrom pyzbar.pyzbar import decode`)
        Generator.addCode(`len(qrcode_val)>0`)
 
    } 

    //%block="The number of QR codes in the picture" blockType="reporter"
    export function qrcodeCount(parameter: any, block: any) {
        Generator.addImport(`import cv2\nimport numpy as np\nfrom pyzbar.pyzbar import decode`)
        Generator.addCode(`len(qrcode_val)`)
 
    } 

    //%block="Get the [VAL] value of the [INDEX]th QR code from the recognition result" blockType="reporter"
    //% INDEX.shadow="number" INDEX.defl="1"
    //% VAL.shadow="dropdown" VAL.options="VAL"
    export function decodeRead(parameter: any, block: any) {
        let val=parameter.VAL.code;
        let index=parameter.INDEX.code;
        Generator.addImport(`import cv2\nimport numpy as np\nfrom pyzbar.pyzbar import decode`)
        Generator.addCode(`qrcode_val[${index}-1]${val}`)
 
    } 
    


    function replaceQuotationMarks(str:string){
            str=str.replace(/"/g, ""); 
            return str
    }


    
}
