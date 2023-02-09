from app.models import db, Choice, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_choices():
    choice1 = Choice(question_id=1, choice='4', is_correct=True)
    choice3 = Choice(question_id=1, choice='5', is_correct=False)
    choice4 = Choice(question_id=1, choice='6', is_correct=False)
    choice5 = Choice(question_id=1, choice='8', is_correct=False)

    choice2 = Choice(question_id=2, choice='16', is_correct=True)
    choice6 = Choice(question_id=2, choice='12', is_correct=False)
    choice7 = Choice(question_id=2, choice='10', is_correct=False)
    choice8 = Choice(question_id=2, choice='8', is_correct=False)

    choice9 = Choice(question_id=3, choice='35', is_correct=True)
    choice10 = Choice(question_id=3, choice='40', is_correct=False)
    choice11 = Choice(question_id=3, choice='45', is_correct=False)
    choice12 = Choice(question_id=3, choice='50', is_correct=False)

    choice13 = Choice(question_id=4, choice='5', is_correct=True)
    choice14 = Choice(question_id=4, choice='4', is_correct=False)
    choice15 = Choice(question_id=4, choice='2', is_correct=False)
    choice16 = Choice(question_id=4, choice='0', is_correct=False)

    choice17 = Choice(question_id=5, choice='5', is_correct=True)
    choice18 = Choice(question_id=5, choice='4', is_correct=False)
    choice19 = Choice(question_id=5, choice='1', is_correct=False)
    choice20 = Choice(question_id=5, choice='Y', is_correct=False)

    choice21 = Choice(question_id=6, choice='Rhinovirus', is_correct=True)
    choice22 = Choice(question_id=6, choice='Influenza', is_correct=False)
    choice23 = Choice(question_id=6, choice='Adenovirus', is_correct=False)
    choice24 = Choice(question_id=6, choice='Parainfluenza', is_correct=False)

    choice25 = Choice(question_id=7, choice='Mammal', is_correct=True)
    choice26 = Choice(question_id=7, choice='Reptile', is_correct=False)
    choice27 = Choice(question_id=7, choice='Bird', is_correct=False)
    choice28 = Choice(question_id=7, choice='Fish', is_correct=False)

    choice29 = Choice(question_id=8, choice='Mercury', is_correct=True)
    choice30 = Choice(question_id=8, choice='Mars', is_correct=False)
    choice31 = Choice(question_id=8, choice='Earth', is_correct=False)
    choice32 = Choice(question_id=8, choice='Venus', is_correct=False)

    choice33 = Choice(question_id=9, choice='H2O', is_correct=True)
    choice34 = Choice(question_id=9, choice='H2O2', is_correct=False)
    choice35 = Choice(question_id=9, choice='H2O3', is_correct=False)
    choice36 = Choice(question_id=9, choice='OH', is_correct=False)

    choice37 = Choice(question_id=10, choice='Photosynthesis', is_correct=True)
    choice38 = Choice(question_id=10, choice='Breathing', is_correct=False)
    choice39 = Choice(question_id=10, choice='Respiration', is_correct=False)
    choice40 = Choice(question_id=10, choice='Digestion', is_correct=False)

    choice41 = Choice(question_id=11, choice='Georges Bizet', is_correct=True)
    choice42 = Choice(question_id=11, choice='Giuseppe Verdi', is_correct=False)
    choice43 = Choice(question_id=11, choice='Wolfgang Amadeus Mozart', is_correct=False)
    choice44 = Choice(question_id=11, choice='Ludwig van Beethoven', is_correct=False)

    choice45 = Choice(question_id=12, choice='Michael Jackson', is_correct=True)
    choice46 = Choice(question_id=12, choice='Elvis Presley', is_correct=False)
    choice47 = Choice(question_id=12, choice='Freddie Mercury', is_correct=False)
    choice48 = Choice(question_id=12, choice='Madonna', is_correct=False)

    choice49 = Choice(question_id=13, choice='Brass', is_correct=True)
    choice50 = Choice(question_id=13, choice='Woodwind', is_correct=False)
    choice51 = Choice(question_id=13, choice='String', is_correct=False)
    choice52 = Choice(question_id=13, choice='Percussion', is_correct=False)

    choice53 = Choice(question_id=14, choice='Freddie Mercury', is_correct=True)
    choice54 = Choice(question_id=14, choice='David Bowie', is_correct=False)
    choice55 = Choice(question_id=14, choice='Elton John', is_correct=False)
    choice56 = Choice(question_id=14, choice='George Michael', is_correct=False)

    choice57 = Choice(question_id=15, choice='Chris Martin', is_correct=True)
    choice58 = Choice(question_id=15, choice='Jon Bon Jovi', is_correct=False)
    choice59 = Choice(question_id=15, choice='Steven Tyler', is_correct=False)
    choice60 = Choice(question_id=15, choice='Freddie Mercury', is_correct=False)

    choice61 = Choice(question_id=16, choice='Francis Ford Coppola', is_correct=True)
    choice62 = Choice(question_id=16, choice='Martin Scorsese', is_correct=False)
    choice63 = Choice(question_id=16, choice='Steven Spielberg', is_correct=False)
    choice64 = Choice(question_id=16, choice='Stanley Kubrick', is_correct=False)

    choice65 = Choice(question_id=17, choice='Tom Hanks', is_correct=True)
    choice66 = Choice(question_id=17, choice='Brad Pitt', is_correct=False)
    choice67 = Choice(question_id=17, choice='Matt Damon', is_correct=False)
    choice68 = Choice(question_id=17, choice='Leonardo DiCaprio', is_correct=False)

    choice69 = Choice(question_id=18, choice='RMS Titanic', is_correct=True)
    choice70 = Choice(question_id=18, choice='SS Queen Elizabeth', is_correct=False)
    choice71 = Choice(question_id=18, choice='SS United States', is_correct=False)
    choice72 = Choice(question_id=18, choice='MS Amsterdam', is_correct=False)

    choice73 = Choice(question_id=19, choice='Robert Downey Jr.', is_correct=True)
    choice74 = Choice(question_id=19, choice='Chris Evans', is_correct=False)
    choice75 = Choice(question_id=19, choice='Chris Hemsworth', is_correct=False)
    choice76 = Choice(question_id=19, choice='Mark Ruffalo', is_correct=False)

    choice77 = Choice(question_id=20, choice='12', is_correct=True)
    choice78 = Choice(question_id=20, choice='5', is_correct=False)
    choice79 = Choice(question_id=20, choice='1', is_correct=False)
    choice80 = Choice(question_id=20, choice='13', is_correct=False)

    choice81 = Choice(question_id=21, choice='Football (Soccer)', is_correct=True)
    choice83 = Choice(question_id=21, choice='Basketball', is_correct=False)
    choice84 = Choice(question_id=21, choice='Tennis', is_correct=False)
    choice85 = Choice(question_id=21, choice='Volleyball', is_correct=False)

    choice82 = Choice(question_id=22, choice='Scratch mine', is_correct=True)
    choice86 = Choice(question_id=22, choice='Feed me', is_correct=False)
    choice87 = Choice(question_id=22, choice='Pat mine', is_correct=False)
    choice88 = Choice(question_id=22, choice='and then run away', is_correct=False)

    choice89 = Choice(question_id=23, choice='Sahara', is_correct=True)
    choice90 = Choice(question_id=23, choice='Gobi', is_correct=False)
    choice91 = Choice(question_id=23, choice='Mojave', is_correct=False)
    choice92 = Choice(question_id=23, choice='Antarctic', is_correct=False)

    choice93 = Choice(question_id=24, choice='Yellow', is_correct=True)
    choice94 = Choice(question_id=24, choice='Orange', is_correct=False)
    choice95 = Choice(question_id=24, choice='Red', is_correct=False)
    choice96 = Choice(question_id=24, choice='Green', is_correct=False)

    choice97 = Choice(question_id=25, choice='60-80 mph', is_correct=True)
    choice98 = Choice(question_id=25, choice='40-60 mph', is_correct=False)
    choice99 = Choice(question_id=25, choice='80-100 mph', is_correct=False)
    choice100 = Choice(question_id=25, choice='30-40 mph', is_correct=False)

    choice101 = Choice(question_id=26, choice='J.K. Rowling', is_correct=True)
    choice102 = Choice(question_id=26, choice='Stephenie Meyer', is_correct=False)
    choice103 = Choice(question_id=26, choice='Suzanne Collins', is_correct=False)
    choice104 = Choice(question_id=26, choice='Veronica Roth', is_correct=False)

    choice105 = Choice(question_id=27, choice='Voldemort', is_correct=True)
    choice106 = Choice(question_id=27, choice='Sirius Black', is_correct=False)
    choice107 = Choice(question_id=27, choice='Draco Malfoy', is_correct=False)
    choice108 = Choice(question_id=27, choice='Professor Snape', is_correct=False)

    choice109 = Choice(question_id=28, choice='Ron Weasley', is_correct=True)
    choice110 = Choice(question_id=28, choice='Hermione Granger', is_correct=False)
    choice111 = Choice(question_id=28, choice='Neville Longbottom', is_correct=False)
    choice112 = Choice(question_id=28, choice='Ginny Weasley', is_correct=False)

    choice113 = Choice(question_id=29, choice='Hogwarts School of Witchcraft and Wizardry', is_correct=True)
    choice114 = Choice(question_id=29, choice='Beauxbatons Academy of Magic', is_correct=False)
    choice115 = Choice(question_id=29, choice='Durmstrang Institute', is_correct=False)
    choice116 = Choice(question_id=29, choice='Ilvermorny School of Witchcraft and Wizardry', is_correct=False)

    choice117 = Choice(question_id=30, choice='Quidditch', is_correct=True)
    choice118 = Choice(question_id=30, choice='Broom Racing', is_correct=False)
    choice119 = Choice(question_id=30, choice='Wizard Ball', is_correct=False)
    choice120 = Choice(question_id=30, choice='Flying Frenzy', is_correct=False)

    choice121 = Choice(question_id=31, choice='Open to more than one interpretation', is_correct=True)
    choice122 = Choice(question_id=31, choice='Clear and precise', is_correct=False)
    choice123 = Choice(question_id=31, choice='Easy to understand', is_correct=False)
    choice124 = Choice(question_id=31, choice='Straightforward', is_correct=False)

    choice125 = Choice(question_id=32, choice='Joy and pleasure', is_correct=True)
    choice126 = Choice(question_id=32, choice='Harshness', is_correct=False)
    choice127 = Choice(question_id=32, choice='Sadness', is_correct=False)
    choice128 = Choice(question_id=32, choice='Peaceful', is_correct=False)

    choice129 = Choice(question_id=33, choice='Withdrawn and distant', is_correct=True)
    choice130 = Choice(question_id=33, choice='Unfriendly', is_correct=False)
    choice131 = Choice(question_id=33, choice='Approachable', is_correct=False)
    choice132 = Choice(question_id=33, choice='Warm', is_correct=False)

    choice133 = Choice(question_id=34, choice='Glowing', is_correct=True)
    choice134 = Choice(question_id=34, choice='Shining', is_correct=False)
    choice135 = Choice(question_id=34, choice='Dull', is_correct=False)
    choice136 = Choice(question_id=34, choice='Dark', is_correct=False)

    choice137 = Choice(question_id=35, choice='With a hidden identity', is_correct=True)
    choice138 = Choice(question_id=35, choice='Famous', is_correct=False)
    choice139 = Choice(question_id=35, choice='Well-known', is_correct=False)
    choice140 = Choice(question_id=35, choice='In plain sight', is_correct=False)

    choice141 = Choice(question_id=36, choice='Canberra', is_correct=True)
    choice142 = Choice(question_id=36, choice='Brisbane', is_correct=False)
    choice143 = Choice(question_id=36, choice='Melbourne', is_correct=False)
    choice144 = Choice(question_id=36, choice='Sydney', is_correct=False)

    choice145 = Choice(question_id=37, choice='Nile River', is_correct=True)
    choice146 = Choice(question_id=37, choice='Limpopo River', is_correct=False)
    choice147 = Choice(question_id=37, choice='Zambezi River', is_correct=False)
    choice148 = Choice(question_id=37, choice='Congo River', is_correct=False)

    choice149 = Choice(question_id=38, choice='Pacific Ocean', is_correct=True)
    choice150 = Choice(question_id=38, choice='Arctic Ocean', is_correct=False)
    choice151 = Choice(question_id=38, choice='Atlantic Ocean', is_correct=False)
    choice152 = Choice(question_id=38, choice='Indian Ocean', is_correct=False)

    choice153 = Choice(question_id=39, choice='Pyrenees', is_correct=True)
    choice154 = Choice(question_id=39, choice='Andes', is_correct=False)
    choice155 = Choice(question_id=39, choice='Alps', is_correct=False)
    choice156 = Choice(question_id=39, choice='Rockies', is_correct=False)

    choice157 = Choice(question_id=40, choice='Brasília', is_correct=True)
    choice158 = Choice(question_id=40, choice='São Paulo', is_correct=False)
    choice159 = Choice(question_id=40, choice='Rio de Janeiro', is_correct=False)
    choice160 = Choice(question_id=40, choice='Belo Horizonte', is_correct=False)

    choice171 = Choice(question_id=41, choice='36', is_correct=True)
    choice172 = Choice(question_id=41, choice='5', is_correct=False)
    choice173 = Choice(question_id=41, choice='25', is_correct=False)
    choice174 = Choice(question_id=41, choice='9', is_correct=False)

    choice175 = Choice(question_id=42, choice='3x^2', is_correct=True)
    choice176 = Choice(question_id=42, choice='3x', is_correct=False)
    choice177 = Choice(question_id=42, choice='6x', is_correct=False)
    choice178 = Choice(question_id=42, choice='x^2', is_correct=False)

    choice179 = Choice(question_id=43, choice='-2', is_correct=True)
    choice180 = Choice(question_id=43, choice='2', is_correct=False)
    choice181 = Choice(question_id=43, choice='1', is_correct=False)
    choice182 = Choice(question_id=43, choice='-1', is_correct=False)

    choice183 = Choice(question_id=44, choice='y = 2x + 8', is_correct=True)
    choice184 = Choice(question_id=44, choice='y = 2x + 2', is_correct=False)
    choice185 = Choice(question_id=44, choice='y = 2x - 2', is_correct=False)
    choice186 = Choice(question_id=44, choice='y = 2x - 8', is_correct=False)

    choice187 = Choice(question_id=45, choice='Air', is_correct=True)
    choice188 = Choice(question_id=45, choice='Water', is_correct=False)
    choice189 = Choice(question_id=45, choice='Fire', is_correct=False)
    choice190 = Choice(question_id=45, choice='Feather', is_correct=False)

    choice191 = Choice(question_id=46, choice='Fire', is_correct=True)
    choice192 = Choice(question_id=46, choice='Water', is_correct=False)
    choice193 = Choice(question_id=46, choice='Ice', is_correct=False)
    choice194 = Choice(question_id=46, choice='Wind', is_correct=False)

    choice195 = Choice(question_id=47, choice='10', is_correct=True)
    choice196 = Choice(question_id=47, choice='11', is_correct=False)
    choice197 = Choice(question_id=47, choice='12', is_correct=False)
    choice198 = Choice(question_id=47, choice='21', is_correct=False)

    choice199 = Choice(question_id=48, choice='Harper Lee', is_correct=True)
    choice200 = Choice(question_id=48, choice='Mark Twain', is_correct=False)
    choice201 = Choice(question_id=48, choice='William Faulkner', is_correct=False)
    choice202 = Choice(question_id=48, choice='Ernest Hemingway', is_correct=False)

    choice203 = Choice(question_id=49, choice='George Washington', is_correct=True)
    choice204 = Choice(question_id=49, choice='Abraham Lincoln', is_correct=False)
    choice205 = Choice(question_id=49, choice='Thomas Jefferson', is_correct=False)
    choice206 = Choice(question_id=49, choice='John F. Kennedy', is_correct=False)

    choice207 = Choice(question_id=50, choice='50', is_correct=True)
    choice208 = Choice(question_id=50, choice='52', is_correct=False)
    choice209 = Choice(question_id=50, choice='49', is_correct=False)
    choice210 = Choice(question_id=50, choice='48', is_correct=False)

    choice211 = Choice(question_id=51, choice='Jupiter', is_correct=True)
    choice212 = Choice(question_id=51, choice='Saturn', is_correct=False)
    choice213 = Choice(question_id=51, choice='Mars', is_correct=False)
    choice214 = Choice(question_id=51, choice='Earth', is_correct=False)

    choice215 = Choice(question_id=52, choice='Money', is_correct=True)
    choice216 = Choice(question_id=52, choice='Success', is_correct=True)
    choice217 = Choice(question_id=52, choice='Love', is_correct=True)
    choice218 = Choice(question_id=52, choice='Happiness', is_correct=True)

    choice219 = Choice(question_id=53, choice='Hard Work', is_correct=True)
    choice220 = Choice(question_id=53, choice='Luck', is_correct=True)
    choice221 = Choice(question_id=53, choice='Consistency', is_correct=True)
    choice222 = Choice(question_id=53, choice='All of the Above', is_correct=True)

    choice223 = Choice(question_id=54, choice='True', is_correct=True)
    choice224 = Choice(question_id=54, choice='False', is_correct=True)
    choice225 = Choice(question_id=54, choice='Both', is_correct=True)
    choice226 = Choice(question_id=54, choice='Neither', is_correct=True)

    choice227 = Choice(question_id=55, choice='Yes', is_correct=True)
    choice228 = Choice(question_id=55, choice='No', is_correct=True)
    choice229 = Choice(question_id=55, choice='Maybe', is_correct=True)
    choice230 = Choice(question_id=55, choice='Bear beats battlestar galactica', is_correct=True)




    db.session.add(choice3)
    db.session.add(choice4)
    db.session.add(choice1)
    db.session.add(choice5)

    db.session.add(choice2)
    db.session.add(choice6)
    db.session.add(choice7)
    db.session.add(choice8)

    db.session.add(choice9)
    db.session.add(choice10)
    db.session.add(choice11)
    db.session.add(choice12)

    db.session.add(choice14)
    db.session.add(choice15)
    db.session.add(choice13)
    db.session.add(choice16)

    db.session.add(choice18)
    db.session.add(choice17)
    db.session.add(choice19)
    db.session.add(choice20)

    db.session.add(choice22)
    db.session.add(choice23)
    db.session.add(choice21)
    db.session.add(choice24)

    db.session.add(choice25)
    db.session.add(choice26)
    db.session.add(choice27)
    db.session.add(choice28)

    db.session.add(choice30)
    db.session.add(choice29)
    db.session.add(choice31)
    db.session.add(choice32)

    db.session.add(choice34)
    db.session.add(choice35)
    db.session.add(choice36)
    db.session.add(choice33)

    db.session.add(choice37)
    db.session.add(choice38)
    db.session.add(choice39)
    db.session.add(choice40)

    db.session.add(choice41)
    db.session.add(choice42)
    db.session.add(choice43)
    db.session.add(choice44)

    db.session.add(choice46)
    db.session.add(choice45)
    db.session.add(choice47)
    db.session.add(choice48)

    db.session.add(choice50)
    db.session.add(choice51)
    db.session.add(choice49)
    db.session.add(choice52)

    db.session.add(choice54)
    db.session.add(choice55)
    db.session.add(choice53)
    db.session.add(choice56)

    db.session.add(choice58)
    db.session.add(choice57)
    db.session.add(choice59)
    db.session.add(choice60)

    db.session.add(choice62)
    db.session.add(choice63)
    db.session.add(choice64)
    db.session.add(choice61)

    db.session.add(choice66)
    db.session.add(choice67)
    db.session.add(choice68)
    db.session.add(choice65)

    db.session.add(choice69)
    db.session.add(choice70)
    db.session.add(choice71)
    db.session.add(choice72)

    db.session.add(choice73)
    db.session.add(choice74)
    db.session.add(choice75)
    db.session.add(choice76)

    db.session.add(choice78)
    db.session.add(choice77)
    db.session.add(choice79)
    db.session.add(choice80)

    db.session.add(choice82)
    db.session.add(choice81)
    db.session.add(choice83)
    db.session.add(choice84)

    db.session.add(choice86)
    db.session.add(choice87)
    db.session.add(choice88)
    db.session.add(choice85)

    db.session.add(choice89)
    db.session.add(choice90)
    db.session.add(choice91)
    db.session.add(choice92)

    db.session.add(choice94)
    db.session.add(choice95)
    db.session.add(choice96)
    db.session.add(choice93)

    db.session.add(choice98)
    db.session.add(choice97)
    db.session.add(choice99)
    db.session.add(choice100)

    db.session.add(choice102)
    db.session.add(choice103)
    db.session.add(choice101)
    db.session.add(choice104)

    db.session.add(choice105)
    db.session.add(choice106)
    db.session.add(choice107)
    db.session.add(choice108)

    db.session.add(choice111)
    db.session.add(choice112)
    db.session.add(choice109)
    db.session.add(choice110)

    db.session.add(choice116)
    db.session.add(choice114)
    db.session.add(choice113)
    db.session.add(choice115)

    db.session.add(choice118)
    db.session.add(choice119)
    db.session.add(choice117)
    db.session.add(choice120)

    db.session.add(choice122)
    db.session.add(choice123)
    db.session.add(choice124)
    db.session.add(choice121)

    db.session.add(choice126)
    db.session.add(choice127)
    db.session.add(choice128)
    db.session.add(choice125)

    db.session.add(choice130)
    db.session.add(choice131)
    db.session.add(choice129)
    db.session.add(choice132)

    db.session.add(choice134)
    db.session.add(choice133)
    db.session.add(choice135)
    db.session.add(choice136)

    db.session.add(choice137)
    db.session.add(choice138)
    db.session.add(choice139)
    db.session.add(choice140)

    db.session.add(choice141)
    db.session.add(choice142)
    db.session.add(choice143)
    db.session.add(choice144)

    db.session.add(choice146)
    db.session.add(choice147)
    db.session.add(choice148)
    db.session.add(choice145)

    db.session.add(choice149)
    db.session.add(choice150)
    db.session.add(choice151)
    db.session.add(choice152)

    db.session.add(choice154)
    db.session.add(choice155)
    db.session.add(choice153)
    db.session.add(choice156)

    db.session.add(choice158)
    db.session.add(choice157)
    db.session.add(choice159)
    db.session.add(choice160)

    db.session.add(choice172)
    db.session.add(choice171)
    db.session.add(choice173)
    db.session.add(choice174)

    db.session.add(choice176)
    db.session.add(choice177)
    db.session.add(choice178)
    db.session.add(choice175)

    db.session.add(choice179)
    db.session.add(choice180)
    db.session.add(choice181)
    db.session.add(choice182)

    db.session.add(choice184)
    db.session.add(choice185)
    db.session.add(choice186)
    db.session.add(choice183)

    db.session.add(choice188)
    db.session.add(choice187)
    db.session.add(choice189)
    db.session.add(choice190)

    db.session.add(choice192)
    db.session.add(choice193)
    db.session.add(choice191)
    db.session.add(choice194)

    db.session.add(choice195)
    db.session.add(choice196)
    db.session.add(choice197)
    db.session.add(choice198)

    db.session.add(choice201)
    db.session.add(choice202)
    db.session.add(choice199)
    db.session.add(choice200)

    db.session.add(choice206)
    db.session.add(choice204)
    db.session.add(choice203)
    db.session.add(choice205)

    db.session.add(choice208)
    db.session.add(choice209)
    db.session.add(choice207)
    db.session.add(choice210)

    db.session.add(choice212)
    db.session.add(choice213)
    db.session.add(choice214)
    db.session.add(choice211)

    db.session.add(choice216)
    db.session.add(choice217)
    db.session.add(choice218)
    db.session.add(choice215)

    db.session.add(choice220)
    db.session.add(choice221)
    db.session.add(choice219)
    db.session.add(choice222)

    db.session.add(choice224)
    db.session.add(choice223)
    db.session.add(choice225)
    db.session.add(choice226)

    db.session.add(choice227)
    db.session.add(choice228)
    db.session.add(choice229)
    db.session.add(choice230)       

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_choices():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.choices RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
