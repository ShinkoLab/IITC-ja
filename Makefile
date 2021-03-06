default: mkdefault

local: mklocal
mobile: mkmobile

mkdefault:
	./build.py

mklocal:
	./build.py local

mkmobile:
	./build.py mobile
	adb install -r build/mobile/IITC_Mobile-debug.apk
	adb shell am start -n net.shinkolab.iitc_ja_mobile/net.shinkolab.iitc_ja_mobile.IITC_Mobile

clean:
	ant -f mobile/build.xml clean

