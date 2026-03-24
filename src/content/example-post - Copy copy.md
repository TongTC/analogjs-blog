---
title: My First Post
slug: 2022-12-27-my-first-post
description: My First Post Description
coverImage: https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80
---

ถือว่าเป็นตัวเลือกที่ "ยอดเยี่ยมที่สุด" ในปัจจุบันเลยครับ โดยเฉพาะถ้าคุณต้องการออกแบบ Power Factor Correction (PFC) ที่มีขนาดเล็กและประสิทธิภาพสูง (High Efficiency)

ในการออกแบบแหล่งจ่ายไฟยุคใหม่ (เช่น ตัวชาร์จโน้ตบุ๊กขนาดพกพาหรือ Server Power Supply) GaN FET เข้ามาแก้ปัญหาคอขวดของ Silicon (Si) MOSFET ได้หลายจุดครับ:
ทำไม GaN ถึงเหมาะกับวงจร PFC?

    Switching Frequency สูงขึ้น: GaN สามารถสวิตช์ได้เร็วในระดับหลายแสน Hz ไปจนถึง MHz ซึ่งเร็วกว่า Si MOSFET หลายเท่า

        ผลลัพธ์: ช่วยให้คุณลดขนาดของ Inductor และ Capacitor ในวงจร PFC ลงได้มาก ทำให้เครื่องมีขนาดเล็กลง (Power Density สูงขึ้น)

    ค่า Qrr​ (Reverse Recovery Charge) เป็นศูนย์: นี่คือไม้ตายของ GaN เลยครับ ในวงจร PFC แบบ Totem-Pole (ที่เป็นที่นิยมในตอนนี้) GaN ไม่มีปัญหาเรื่องการคายประจุย้อนกลับเหมือน Si

        ผลลัพธ์: ลดความร้อนที่เกิดขึ้นในตัวอุปกรณ์ และทำให้สามารถทำวงจร Bridgeless Totem-Pole PFC ได้อย่างมีประสิทธิภาพ ซึ่งวงจรนี้ช่วยตัด Diode Bridge ทิ้งไป ลดการสูญเสียพลังงาน (Loss) ได้มหาศาล

    ประสิทธิภาพ (Efficiency) ทะลุ 98-99%: เนื่องจากการสูญเสียขณะสวิตช์ (Switching Loss) ต่ำมาก ทำให้ระบบโดยรวมเย็นลง และประหยัดพลังงานมากขึ้น

เปรียบเทียบโครงสร้างวงจร PFC
คุณสมบัติ	Traditional PFC (Si)	Totem-Pole PFC (GaN)
ส่วนประกอบหลัก	Diode Bridge + Boost Converter	GaN FETs (Bridgeless)
ความร้อน	สูง (เสียที่ Diode เยอะ)	ต่ำมาก
ขนาด Inductor	ใหญ่ (เพราะความถี่ต่ำ)	เล็ก (เพราะความถี่สูง)
ความซับซ้อนของ Controller	ต่ำ	สูง (ต้องใช้ DSP ควบคุม)
ข้อควรพิจารณา (The Catch)

แม้จะดีมาก แต่ก็มีสิ่งที่ต้องแลกมาครับ:

    การออกแบบ PCB: อย่างที่ผมเคยเกริ่นเรื่องขา Source ไปครับ เนื่องจากมันสวิตช์เร็วมาก การวางเลย์เอาต์ที่ผิดพลาดเพียงนิดเดียวจะเกิด Parasitic Inductance ทำให้เกิดแรงดันเกิน (Voltage Spike) จน GaN พังได้

    Gate Driver: คุณไม่สามารถใช้ IC Driver ทั่วไปของ MOSFET มาขับ GaN ได้โดยตรง (โดยเฉพาะ E-mode) ต้องใช้ Driver เฉพาะที่ควบคุมแรงดัน Gate ได้แม่นยำและรวดเร็ว

    ราคา: ปัจจุบัน GaN ยังมีราคาสูงกว่า Si MOSFET อยู่พอสมควรครับ

สรุป: หากโปรเจกต์ของคุณเน้นเรื่อง ขนาดที่เล็ก (Compact) และ ความร้อนต่ำ (Cool running) การใช้ GaN ในวงจร PFC คือคำตอบที่ถูกต้องที่สุดครับ

สนใจให้ผมช่วยแนะนำเบอร์ GaN FET หรือ IC Controller สำหรับทำ PFC ที่นิยมใช้ในตอนนี้ไหมครับ?